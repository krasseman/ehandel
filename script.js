    $(document).ready(function(){
    var mainCatList;
    var shoppingCart = [];
    var kundlista = [];
   
    // Kolla om session storage finns, om inte skapa den.
    if (sessionStorage.shoppingCart == null) {
        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str;
       
        
 }


 // hämta

 var parseCartList = JSON.parse(sessionStorage.shoppingCart);

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
     var kunder = kundlista;
    
    
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
        
    
        showShoppingCart = function(){
            $(".main").html("<div class='cartTitle'><h2>Kundvagn</h2></div><hr class='productHR'>");
    
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
            
            var loginForm = "<input type='text' name='Mail' value='Mailadress' class='mailForm'>"
            var passForm = "<input type='password' name='Lösenord' value='........' class='passwordForm'>"
            var submit = "<button class='loginBtn' onclick='logIn()'>Logga in</button>";
           
           
            $(".formWrap").append(loginForm + passForm + submit);
        }

       /* Inlogg -----------------              
                logIn = function(){
                var kunder = kundlista;
                   
                    for(var i = 0; i < kundlista.length; i++){
                        var kunder = kundlista; 
               
                        //Om password och username stämmer loggas användare in och sparas i sessionstorage
                        if( $(".mailForm").val() == kundlista[i].username && $(".passwordForm").val() == kundlista[i].password){
                            var kunder = kundlista;  
                            console.log("yes")
                            console.log(kunder);
                            sessionStorage.saveUser = kunder[i].username;

            
            
                        //annars visas glömt lösenord
                            }else{
                            console.log("no")
                            var kunder = kundlista;
                            }       
                        }
                }

               */
        checkOut = function(){
    
            $(".main").html("<div class='cartTitle'><h2>Tack för ditt köp!</h2></div>");
            console.log(sessionStorage.shoppingCart);
        }
    
        delCartItem = function(i){
          var parseCartList = JSON.parse(sessionStorage.shoppingCart)
          
            parseCartList.splice(i, 1);
           
            var json_str = JSON.stringify(parseCartList);
            sessionStorage.shoppingCart = json_str; 
            
            console.log("hej")
    
            showShoppingCart();
            $("#counter").html(parseCartList.length);
            if (parseCartList.length <= 0){
               
            }
        }
    
    }
            
    });
        
        
    
    
    
      
        
        
        
            
  
        