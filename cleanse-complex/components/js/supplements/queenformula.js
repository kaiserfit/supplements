$(".p-details").click(function() {
    
var src = $(this).data("src");
$("#imgHold").prop("src",src);
   });


$("#scrollToProduct").click(function() {
    
   document.getElementById('section13').scrollIntoView({
      behavior: 'smooth'
   });
   });

   
   function updateCart(sku, bot, src, price, desc, ship) {
      var elements = {
         skuid: sku,
         ship: ship,
         src: src,
         price: price,
         desc: desc,
         qty: 1,
         botCount: bot

      }

     cart.push(elements);
     var jsonStr = JSON.stringify( cart );
     sessionStorage.setItem( "cart", jsonStr );

      var cartValue = sessionStorage.getItem( "cart" );
      var cartObj = JSON.parse( cartValue );
      document.cookie = "cartContents="+cartValue+";path=/";
      document.cookie = "cartCount="+cartObj.length+";path=/";
      
      document.getElementById("cartCount").textContent = cartObj.length;
     
   }

function updateCartCount(idx, bot){
   cart[idx].qty += 1;
   cart[idx].botCount += bot;
   var jsonStr = JSON.stringify( cart );
    sessionStorage.setItem( "cart", jsonStr );
    var cartValue = sessionStorage.getItem( "cart" );
var cartObj = JSON.parse( cartValue );
document.cookie = "cartContents="+cartValue+";path=/";
document.cookie = "cartCount="+cartObj.length+";path=/";
document.getElementById("cartCount").textContent = cartObj.length;
}
   $(".atc").click(function() {
      
      $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
      var src = $(this).data("src");
      var price = $(this).data("price");
      var desc = $(this).data("desc");
      var sku = $(this).data("sku");
      var ship = $(this).data("ship");
      var bot = $(this).data("bot");
      var cLength = cart.length;
     
     if (cLength > 0){
      
      var idx = cart.findIndex((obj => obj.skuid == sku));
      console.log(idx);
         if (idx < 0) { //item not yet in cart
            updateCart(sku, bot, src, price, desc, ship); 
         } else { //item exists in cart so update qty
            updateCartCount(idx, bot)
         }
      } else {
         updateCart(sku, bot, src, price, desc, ship); 
      }
      alert("Product Added to Cart");
      ttq.track('AddToCart');
analytics.track("Product Added")
     $(this).html("Add to Cart");
     // $(this).prop('disabled', true);
      $(this).nextAll(".view-cart").show();
         });


         $(".ctc").click(function() {
      
            
            var src = $(this).data("src");
            var price = $(this).data("price");
            var desc = $(this).data("desc");
            var sku = $(this).data("sku");
            var ship = $(this).data("ship");
            var bot = $(this).data("bot");
            var cLength = cart.length;
           console.log();
           if (cLength > 0){
            
            var idx = cart.findIndex((obj => obj.skuid == sku));
            console.log(idx);
               if (idx < 0) { //item not yet in cart
                  updateCart(sku, bot, src, price, desc, ship); 
               } else { //item exists in cart so just redirect to checkout
                  // updateCartCount(idx, bot)
                  window.location.href= "//user-checkout.html";
               }
            } else {
               updateCart(sku, bot, src, price, desc, ship); 
            }
           window.location.href= "/user-checkout.html"
          
           
         
               });