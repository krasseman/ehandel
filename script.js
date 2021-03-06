    $(document).ready(function(){
    var mainCatList;
    var shoppingCart = [];
   var kundlista = [];
   
    // Kolla om session storage finns, om inte skapa den.
    if (sessionStorage.shoppingCart == null) {
        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str;
       
        
 }

 if (sessionStorage.kundlista == null) {
    var json_str = JSON.stringify(kundlista);
    sessionStorage.kundlista = json_str;
   
    
}

 // hämta

 var parseCartList = JSON.parse(sessionStorage.shoppingCart);

 var parsekundlista = JSON.parse(sessionStorage.kundlista);


 fetch("./kunder.json")
 .then(function(response) {
     return response.json();
 })
 .then(function(kunder) {
   kundlista = kunder;

    
 });

 fetch("./huvudkategorier.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(huvudkategorier) {
            mainCatList = huvudkategorier;
            printMainCat();
        });
    
    fetch("./underkategorier.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(underkategorier) {
            subCatList = underkategorier;
        });
    
    fetch("./produkter.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(produkter) {
            productList = produkter;
        });

    
       
        var slideIndex = 0;
     showSlides();
      
        $("#counter").html(parseCartList.length);

        
  function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; 
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1} 
            slides[slideIndex-1].style.display = "block"; 
            setTimeout(showSlides, 3000); // Change image every 2 seconds
        }     
   
    function printMainCat(){

    
    
        $(".mainMenuList").append("<li><a href='index.html'>START</a></li>");
        for(var i = 0; i < mainCatList.length; i++){
            
            var mainCatName = "<li class='mainMenuItemClass' onclick='printSubCat(" + [i] + "); printProductList(" + [i] + ")'><a href='#'>" + mainCatList[i].mainCategory + "</a></li>";
            $(".mainMenuList").append(mainCatName);
        }
        $(".mainMenuList").append("<li><a href='#'>KONTAKT</a></li>");
        $(".mainMenuList").append("<li><a href='#'>INFORMATION</a></li>");
    
        
     
    
        printSubCat = function(i){      
            $(".subMenuList").html("");    
            for(var index = 0; index < subCatList.length; index++){
                var subCatName = "<li onclick='printProductList(" + subCatList[index].id + ")'><a href='#'>" + subCatList[index].subCategory + "</a></li>";
    
                if (subCatList[index].mainCategory == i+1){
                    $(".subMenuList").append(subCatName);
                }
            }
        }
        printProductList = function(i){
            $(".main").html("");
            
            for(var index = 0; index < productList.length; index++){
                
                var productCardName = "<h2>" + productList[index].prodName  + "</h2>";
                var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                var productCardImage = "<img class='productCardImg' onclick='showProduct(" + productList[index].id + ")' src='img/products/" + productList[index].prodImg + "'>";
    
                var productCard = "<div class='productCard'>" + productCardImage + productCardName + productCardPrice + "</div>";
    
                if (productList[index].mainCategory == i+1){
                    $(".main").append(productCard);
                }
                else if (productList[index].subCategory == i ){
                    $(".main").append(productCard);
                }
            }
        }
        showProduct = function(i){
            $(".main").html("");
            
            for(var index = 0; index < productList.length; index++){
                var productName = "<h2>" + productList[index].prodName  + "</h2>";
                var productPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                var productImage = "<img class='productImg' alt='" + productList[index].prodName + "' src='img/products/" + productList[index].prodImg + "'>";
                var productDescription = "<p>" + productList[index].prodDesc + "</p>";
                var cartButton = "<button class='cartButton' onclick='addToCart(" + productList[index].id + ")'>Lägg i kundvagn</button>";
    
                var productTitle = "<div class='productTitle'>" + productName + "<hr class='productHR'>" + productPrice + "</div>"
                var productContainer = "<div class='productContainer'>" + cartButton + productDescription + "</div>";
                var productPage = "<div class='productPage'>" + productImage + productTitle + productContainer + "</div>";
                if (productList[index].id == i){
                    $(".main").append(productPage);
                }
            }
        }
        addToCart = function(i){
            
            var productName = productList[i-1].prodName
            var productPrice = productList[i-1].prodPrice
            var parseCartList = JSON.parse(sessionStorage.shoppingCart);
    
            parseCartList.push(productList[i-1]);
            $("#counter").html(parseCartList.length);
          
            var json_str = JSON.stringify(parseCartList);
            sessionStorage.shoppingCart = json_str;
        }
        
    //** Lägg till logga ut knapp här */
        showShoppingCart = function(){
            $(".main").html("<div class='cartTitle'><h2 class='kundVagn'>Kundvagn</h2></div><hr class='productHR'>");
          
            if (sessionStorage.getItem("userName"))  {
                
                    $(".kundVagn").html(sessionStorage.getItem("userName") + 's' + ' ' + 'kundvagn');   
                }


            var parseCartList = JSON.parse(sessionStorage.shoppingCart)
            var priceTotal = 55;
            for(var i = 0; i < parseCartList.length; i++) {
                priceTotal += parseCartList[i].prodPrice;
            }
           
        
            $(".cartTitle").append("<h3>Totalpris: " + priceTotal + " kr</h3>");
    
    
              var cartListProdName = "<ul class='cartListProdName'>";
            var cartListProdPrice = "<ul>";
            var cartListRemove = "<ul class='cartListRemove'>";
    
            for(var i = 0; i < parseCartList.length; i++){
        
                cartListProdName += "<li>" + parseCartList[i].prodName + "</li>";
                cartListProdPrice += "<li>" + parseCartList[i].prodPrice + " kr</li>";
                cartListRemove += "<li><a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a></li>";
            }
    
            var json_str = JSON.stringify(parseCartList);
            localStorage.shoppingCart = json_str; 


            cartListProdName += "<li>Frakt</li></ul>";
            cartListProdPrice += "<li>55 kr</li></ul>";
            cartListRemove += "</ul>";
           
            
        
            $(".main").append("<div class='cartList'></div><div class='cartTotal'></div>");
            $(".cartList").append(cartListProdName + cartListProdPrice + cartListRemove);
            var loginBtn = "<button class='loginBtn' onclick='showLogin()'>Logga in</button>";
            var checkOutButton = "<button class='cartButton' onclick='checkOut()'>Gå till kassan</button>";
            $(".cartTotal").append(checkOutButton + loginBtn);
       
       
       
        }
     

        
      
         
         showLogin = function () {
            $(".main").append("<div class='formWrap'></div>");
            
            var loginForm = "<input type='text' name='Mail' value='Mailadress' id='mailForm'>"
            var passForm = "<input type='password' name='Lösenord' value='........' id='passwordForm'>"
            var submit = "<button class='submitBtn' onclick='checkMail()'>Logga in</button>";
           
           
            $(".formWrap").append(loginForm + passForm + submit);
            $(".loginBtn").hide();
        }

               /** LOGIN FUNKTION */
                checkMail = function(){
                    
                 var parsekundlista = JSON.parse(sessionStorage.kundlista);
                   
                    for(var i = 0; i < kundlista.length; i++){
                        
               
                  
                        if( $("#mailForm").val() == kundlista[i].username){
                            
                       
                        }
                      
                        }
                    
                for(var i = 0; i < kundlista.length; i++){ 

                    if( $("#passwordForm").val() == kundlista[i].password){
                     
                    }
                }
                
                 for(var i = 0; i < kundlista.length; i++){ 
                    
                    if( $("#mailForm").val() == kundlista[i].username && $("#passwordForm").val() == kundlista[i].password){
                     var name = document.getElementById('mailForm').value;
                     sessionStorage.setItem("userName", kundlista[i].username);
                     
                     $(".kundVagn").html(sessionStorage.getItem("userName") + 's' + ' ' + 'kundvagn');  



                     
               
                      loggedIn();
                      console.log(parsekundlista)
     
              
                      
                    }
                    
            }
        }
            
        function loggedIn() {
      
            $(".formWrap").hide();
            $(".loginBtn").hide();
         
        }



        checkOut = function(){
    
           
            sessionStorage.clear();
            $("#counter").html(parseCartList.length);
            
            $(".main").html("<div class='cartTitle'><h2>Tack för ditt köp!</h2></div>");

        }
    
        delCartItem = function(i){
          var parseCartList = JSON.parse(sessionStorage.shoppingCart)
          
            parseCartList.splice(i, 1);
           
            var json_str = JSON.stringify(parseCartList);
            sessionStorage.shoppingCart = json_str; 
        
    
            showShoppingCart();
            $("#counter").html(parseCartList.length);
            if (parseCartList.length <= 0){ 
               
            }
        
        }
        kundLista = function(){
   
            $(".adminMain").html("<h3>Kundlista:</h3></br>")
    
         
            
            for(var i = 0; i < kundlista.length; i++) {
               $(".adminMain").append(kundlista[i].username + "<br>") 
               
            }
        
        }
    }
            
    });
        
        
    
    
    
      
        
        
        
            
  
        