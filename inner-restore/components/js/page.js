$(document).ready(function(){

    $('body').css('padding-bottom', '0');

});



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";

      }

    

var cart = [];
var cartValue = sessionStorage.getItem( "cart" );
if (cartValue !== null) {
  var cartObj = JSON.parse( cartValue );
  cart = cartObj;
  document.cookie = "cartContents="+cartValue+";path=/";
  //var ccc = getCookie("cartContents");

if (document.getElementById("cartCount")) {
  document.getElementById("cartCount").textContent = cartObj.length;
}
  
  //console.log(cart);
} else {
 
  console.log("cart initiated");
}




function cartPop() {
  $('#cartBody').empty();
  var cTotal = 0.00;
  for (var i = 0; i < cart.length; i++) { 
    var tTOtals = (parseFloat(cart[i].price) * parseFloat(cart[i].qty)).toFixed(2);
    var idx = cart.indexOf(cart[i]);
    
    $('#cartBody').append("<tr>"+
                         "<td><img class='cart-img' src="+ cart[i].src +"><h4 style='font-size: 2vh;'>"+ cart[i].desc +"</h4></td>"+
                         "<td>$"+ cart[i].price +"</td>"+
                         "<td>"+ cart[i].qty +"</td>"+
                         "<td style='text-align: right;word-wrap:break-word;'>$"+ (parseFloat(cart[i].price) * parseFloat(cart[i].qty)).toFixed(2) +"</td>"+
                         "<td><a href='javascript:;' class'remove-from-cart' onclick='removeFromCart(id)' id="+ idx +"><br><span style='color:red;' class='glyphicon glyphicon-remove'></span></a></td>"+
                         "</tr>");
                         cTotal = parseFloat(cTotal) + parseFloat(tTOtals);
                         //console.log(jQuery.type(tTOtals));
   }

   if ($('#freebie').length === 0 && cart.length > 0) {
    addFree();
  }
  
   document.getElementById("cTotals").innerHTML = "<span style='color: green; font-weight: 500;text-align: right;'>$"+parseFloat(cTotal)+"</span>";

}

function addFree(){
  $('#cartBody').append("<tr id='freebie'>"+
  "<td><img alt='kaisercoach free trial' class='cart-img' src='../components/img_assets/kaisercoach/kaisercoach.jpg'><h4 style='font-size: 2vh;'>FREE - 30-day KaiserCoach Trial ($79 Value)</h4></td>"+
  "<td><span style='text-decoration: line-through'>$79.00</span><br><span class='text-success'>FREE</span></td>"+
  "<td>1</td>"+
  "<td class='text-success' style='text-align: right;word-wrap:break-word;'>$0.00</td>"+
  "<td>&nbsp;</td>"+
  "</tr>");
 
  //console.log(jQuery.type(tTOtals));

}

$('#modCart').on('shown.bs.modal', function (e) {
  $('#cartBody').empty();
  console.log(cart.length);
  var cTotal = 0.00;
  for (var i = 0; i < cart.length; i++) { 
    var tTOtals = (parseFloat(cart[i].price) * parseFloat(cart[i].qty)).toFixed(2);
    var idx = cart.indexOf(cart[i]);
    
    $('#cartBody').append("<tr>"+
                         "<td><img class='cart-img' src="+ cart[i].src +"><h4 style='font-size: 2vh;'>"+ cart[i].desc +"</h4></td>"+
                         "<td>$"+ cart[i].price +"</td>"+
                         "<td>"+ cart[i].qty +"</td>"+
                         "<td style='text-align: right;word-wrap:break-word;'>$"+ (parseFloat(cart[i].price) * parseFloat(cart[i].qty)).toFixed(2) +"</td>"+
                         "<td><a href='javascript:;' class'remove-from-cart' data-toggle='tooltip' data-placement='top' title='Remove Item' onclick='removeFromCart(id)' id="+ idx +"><br><span style='color:red;' class='glyphicon glyphicon-remove'></span></a></td>"+
                         "</tr>");
                         cTotal = parseFloat(cTotal) + parseFloat(tTOtals);
                         //console.log(jQuery.type(tTOtals));
   }

   if ($('#freebie').length === 0) {

    addFree();
  }
   
   document.getElementById("cTotals").innerHTML = "<span style='color: green; font-weight: 500;text-align: right;'>$"+parseFloat(cTotal)+"</span>";
});


function getHashVal(page){
var htmlPage = pages.find(x => x.id === page).page;
return htmlPage;
}

function getCookie1(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";

      }

     function checkCookie1() {
     var page1 = getCookie1("refPage");
      return page1;
  }




function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
 

 $("#scrollup").click(function() {
  $('html, body').animate({scrollTop: '0px'}, 300);
 });
function removeFromCart(id){
  cart.splice(id, 1);
  var jsonStr = JSON.stringify( cart );
  sessionStorage.setItem( "cart", jsonStr );

   var cartValue = sessionStorage.getItem( "cart" );
   var cartObj = JSON.parse( cartValue );
   document.cookie = "cartContents="+cartValue+";path=/";
   

   document.getElementById("cartCount").textContent = cartObj.length;
  cartPop();
}


$("#clearCart").click(function() {
  cart = [];
  var jsonStr = JSON.stringify( cart );
  sessionStorage.setItem( "cart", jsonStr );

   var cartValue = sessionStorage.getItem( "cart" );
   var cartObj = JSON.parse( cartValue );
   document.cookie = "cartContents="+cartValue+";path=/";
   

   document.getElementById("cartCount").textContent = cartObj.length;
   cartPop();

});


$("#ptcBtn").click(function() {

  $("#cartError").html('');
    if (cart.length > 0) {
      window.location.href = "https://kaisercoach.com/checkout.html";
    } else {
      $("#cartError").html('<h4 class="text-danger">No Items in Cart</h4>');
    }
  
});
//  window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// }



