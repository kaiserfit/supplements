// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
//pk_live_DIH0BmB1obyjQvuimdsJI9MH - live
//pk_test_51Id2gRBVqVZ2ueLqtIH9GclmrHJII2dhR7s8iGJqGsaOzukryligGXvYNnMkS4nomXb5rAAw8mZYmOrJxHtinU2Z00J4rsWz7z
$(document).ready(function(){
  
  $('#ob').prop('checked', true);
});


function getUserDate(){
  var d = new Date();

  var date1 = d.getFullYear() + '-' +
            ((d.getMonth()+1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) +
            '-' +
            (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());

var time1 = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
            ':' +
            (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
            ':' +
            (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());

            var dd = date1+ " " +time1;
          return dd;
}






//*******intl-Tel-input******/
const apiKey = 'lvGIkZjrl3DIar1Uh5t0';
var input = document.querySelector("#cnum");
  	var dc="";
     var iti =   window.intlTelInput(input,{
      
      
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
          dc = countryCode;
        });
      },
    initialCountry: "auto",
    utilsScript: "build/js/utils.js?1613236686837",
    
    } );
  
 //var inputx = document.querySelector("#cnum"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin


var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {

      validMsg.classList.remove("hide");

        var em = $("#cmail").val();
        var w = isEmail(em);
        if (w){ //email is also valid
          var f = $("#fname").val();
          var nums = input.value;
          var ref="https://kaisercoach.com/checkout.html";


          sendyNonBuyers(em, f, nums, dc, ref);
        } 
       return true;
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
      return false;
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

function checkIntl(){
   //reset();
  var inputx = document.querySelector("#cnum");
    if (inputx.value.trim()) {
    if (iti.isValidNumber()) {
     
      
       return true;
    } else {
      //inputx.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      //errorMsg.classList.remove("hide");
      return false;
    }
  }
  
}



  
  
   //*******intl-Tel-input******/
// var stripe = Stripe('pk_test_laGA1Jl4I44TUJFzQJI8DNuD');
var stripe = Stripe('pk_live_DIH0BmB1obyjQvuimdsJI9MH');
var elements = stripe.elements();

var tokenx = "";
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

                   function checkCookie() {
										var uToken = getCookie("userToken");
                    
										tokenx = uToken;
              

                }
              
    function nextPage(){
        var botQ = getCookie("botqty");
        if (botQ >= 1 && botQ <= 2){
          window.location.href = "/stage/queen-formula-3.html";
        }
        if (botQ >= 3 && botQ <= 5){
          window.location.href = "/stage/queen-formula-6.html";
        }
        if (botQ >= 6){
          window.location.href = "/stage/queen-formula-12.html";
        }
    }    
           // checkCookie();

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
 // var sku = getParameterByName('sku');

// Create an instance of the card Element.
var card = elements.create('cardNumber', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

var cardexp = elements.create('cardExpiry', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

var cardcvc = elements.create('cardCvc', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#stripecn');
cardexp.mount('#stripexpd');
cardcvc.mount('#stripecc');


function abc(em, f, nums, dc, ref){
      var abc = 'owBPC2nr1CyTFccBvwsIuQ';

      $.ajax({
    type: 'POST',
    url: 'https://sendy.kaisercoach.com/subscribe',
    crossDomain: true,
    data: {'api_key': apiKey,'name': f, 'email': em,'list': abc,'country': dc,'referrer': ref, 'boolean': true,  'phone': nums},
    dataType: 'json',
    success: function(data) {
    
          console.log(' ');
          }
    });
}  

function sendyNonBuyers(em, f, nums, dc, ref){
      var nonBuyers = 'EiQOTupLHgnLNvC1XRQJZA';

        $.ajax({
      type: 'POST',
      url: 'https://sendy.kaisercoach.com/subscribe',
      crossDomain: true,
      data: {'api_key': apiKey,'name': f, 'email': em,'list': nonBuyers,'country': dc,'referrer': ref, 'boolean': true,  'phone': nums},
      dataType: 'json',
      success: function(data) {
          console.log('');
            
            }
      });
      abc(em, f, nums, dc, ref);
}

function sendyBuyers(){
  var buyers = 'GZ78RQV4XtaFeK4BRXoDxg';
  var email = $("#cmail").val();
  var f = $("#fname").val();
  let cn = $("#cnum").val();
  var nums = sendToInt(cn);
  var ref = "https://kaisercoach.com/checkout.html";
    $.ajax({
  type: 'POST',
  url: 'https://sendy.kaisercoach.com/subscribe',
  crossDomain: true,
  data: {'api_key': apiKey,'name': f, 'email': email,'list': buyers,'country': dc,'referrer': ref, 'boolean': true,  'phone': nums},
  dataType: 'json',
  success: function(data) {
      console.log('');
        
        }
  });
 
}


function unsubscribeAbc(){
  var abc = 'owBPC2nr1CyTFccBvwsIuQ';
  var emailx = $("#cmail").val();

  $.ajax({
    type: 'POST',
    url: 'https://sendy.kaisercoach.com/unsubscribe',
    crossDomain: true,
    data: {'email': emailx,'list': abc, 'boolean': true},
    dataType: 'json',
    success: function(data) {
        console.log('');
          
          }
    });

}

function unsubscribeNonBuyers(){
  var nonBuyers = 'EiQOTupLHgnLNvC1XRQJZA';
  var emailx = $("#cmail").val();

  $.ajax({
    type: 'POST',
    url: 'https://sendy.kaisercoach.com/unsubscribe',
    crossDomain: true,
    data: {'email': emailx,'list': nonBuyers, 'boolean': true},
    dataType: 'json',
    success: function(data) {
        console.log('');
          
          }
    });

}

function checkIntl(){
  //reset();
 var inputx = document.querySelector("#cnum");
   if (inputx.value.trim()) {
   if (iti.isValidNumber()) {
    
     //validMsg.classList.remove("hide");

      return true;
   } else {
     //inputx.classList.add("error");
     var errorCode = iti.getValidationError();
     errorMsg.innerHTML = errorMap[errorCode];
     //errorMsg.classList.remove("hide");
     return false;
   }
 }
 
}


function sendToInt(cn) {
  var country_code = iti.getSelectedCountryData()["dialCode"];
  var ccde = "+"+country_code;
    var nums = ccde + " "+cn;
    return nums;
}

$('#cmail').blur(function(){
  $("#email-error").hide();
  var r = $("#btnStripe").is(':disabled');
  
  var x = isEmail(this.value);
    if (!x){
      $("#email-error").show();
        if (!r){
          $("#btnStripe").prop('disabled', true);
        }
    } 
 });


function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
  return regex.test(email);
}
function checkForm(){
  $("#formErrors").empty();
  var valid = true;
  var f=$("#fname").val();
  var em=$("#cmail").val();
  var s=$("#sname").val();
  var ct=$("#cTown").val();
  var pc=$("#postCode").val();
  var cc=$("#cCountry").val();
  var cn=$("#cnum").val();
  if ($("#fname").val() === "") {
    $("#formErrors").append("<p>Name is required</p>");
    valid = false;
  }

  if (!isEmail(em)){
    $("#formErrors").append("<p>Email is Invalid</p>");
     valid = false;
 }

 if(!checkIntl()){
  valid = false;
}

if (s==""){
  $("#formErrors").append("<p>Street Name is required</p>");
  valid = false;
} 
if (ct==""){
  $("#formErrors").append("<p>City/Town is required</p>");
  valid = false;
} 
if (pc==""){
  $("#formErrors").append("<p>Zip Code is required</p>");
  valid = false;
} 
if (cc==null){
  $("#formErrors").append("<p>Country is required</p>");
  valid = false;
} 

  if (valid === false) {
    $('html, body').animate({ scrollTop: $('#formErrors').offset().top }, 'slow');
    console.log(valid);
    return false;
  } else {
   console.log(valid);
   var x = sendToInt(cn);
   //combine the country code and number
   var form = document.getElementById('checkoutForm');
   var hiddenInput = document.createElement('input');
   hiddenInput.setAttribute('type', 'hidden');
   hiddenInput.setAttribute('name', 'phones');
   hiddenInput.setAttribute('value', x);
   form.appendChild(hiddenInput);
    return true;
  }


} //end checkForm func


var form = document.getElementById('checkoutForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();

// payIntent();
//   return false;
if (checkForm()){

  
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
     // var errorElement = document.getElementById('card-errors');
     // errorElement.textContent = result.error.message;
    
      
      $("#card-errors").html('');
         $("#card-errors").append("<p style='color: red;'>"+ result.error.message +"</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
       // $("#modPurchase").modal('hide');
    } else {
      
     
      
      // Send the token to your server.
      stripeTokenHandler(result.token);
   
    }
  });  
}
  
});
function clearCart(){
  cart = [];
  var jsonStr = JSON.stringify( cart );
  sessionStorage.setItem( "cart", jsonStr );

   var cartValue = sessionStorage.getItem( "cart" );

   document.cookie = "cartContents="+cartValue+";path=/";
}
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  $("#card-errors").html('');
  var form = document.getElementById('checkoutForm');

  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
  let pdate = getUserDate();
  var dd = $('#checkoutForm').serialize(); 
	// dd += "&tokenx=" + tokenx;
  dd += "&items=" + JSON.stringify(cartContents);
  dd += "&pdate="+pdate;
 
  
 
  // Submit the form
  $.ajax({
    type: 'POST',
    // url: 'https://kaisercoach.com/api/payment-test.php',
    url: 'https://pay.kaiserfitapp.com/api/purchase.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
      
      if(data.result){
        clearCart();
        unsubscribeNonBuyers();
        unsubscribeAbc();
        sendyBuyers();
      document.cookie = "cName="+data.username; 
      document.cookie = "cid="+data.cid; 
      document.cookie = "hash="+data.hash; 
      document.cookie = "cmail="+data.email;
      document.cookie = "orderid="+data.orderid;
      document.cookie = "fs-watched=0";
     
     
      
          
     
 
        
       $("#ldr").removeClass("glyphicon-alert");
     $("#ldr").addClass("glyphicon-ok");
      window.location.href= "/push/u1.html";
    
      } else {
        $("#card-errors").append("<p style='color: red;'>Declined/Insufficient Funds.<br>Please Check your Card Details</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#modPurchase").modal('hide');
      }
      
      if (data.result == "false"){
        $("#card-errors").append("<p style='color: red;'>Declined/Insufficient Funds.<br>Please Check your Card Details</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#modPurchase").modal('hide');
      }
     
     // window.location.href = "/stage/upsell-1.html";
    },
      error: function (data, xhr,jqXHR, ajaxOptions, thrownError) {
       
        
     		$("#card-errors").append("<p style='color: red;'>Declined/Insufficient Funds.<br>Please Check your Card Details</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#modPurchase").modal('hide');
      
        
      }
   
	 });
  
 
  
}