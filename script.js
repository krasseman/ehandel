$(document).ready(function(){
    var mainCatList;
   
    
    
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
    
   
    function printMainCat(){
        $(".mainMenuList").append("<li><a href='index.html'>START</a></li>");
        for(var i = 0; i < mainCatList.length; i++){
            
            var mainCatName = "<li class='mainMenuItemClass' onclick='printSubCat(" + [i] + "); printProductList(" + [i] + ")'><a href='#'>" + mainCatList[i].mainCategory + "</a></li>";
            $(".mainMenuList").append(mainCatName);
        }
        $(".mainMenuList").append("<li><a href='#'>KONTAKT</a></li>");
        $(".mainMenuList").append("<li><a href='#'>INFORMATION</a></li>");
    
        
     
    }
        });
    
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
        

    
         });
        
        
    
    
    
      
        
        
        
            
  
        