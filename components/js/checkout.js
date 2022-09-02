function encode(str) {
  var encoded = "";
  str = btoa(str);
  str = btoa(str);
  for (i=0; i<str.length;i++) {
  var a = str.charCodeAt(i);
  var b = a ^ 10; // bitwise XOR with any number, e.g. 123
  encoded = encoded+String.fromCharCode(b);
  }
  encoded = btoa(encoded);
  return encoded;
  }

  function createCookie(name, value, minutes) {
    var expires;
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
cartContents = [];
var cartValue = sessionStorage.getItem( "cart" );
if (cartValue !== null) {
  var cartObj = JSON.parse( cartValue );
  cartContents = cartObj;
  
  //document.cookie = "cartContents="+cartValue+";path=/";
  //var ccc = getCookie("cartContents");


  
  //console.log(cart);
} else {
 
  console.log("no Cart Items Detected");
}
var omount = '';
function sumPop() {
  if (cartContents.length === 0){
    $('#orderSummary').html("<h4>No Items in Cart</h4>");
    $("#btnStripe").prop('disabled', true);
  } else {

 

    $('#orderSummary').empty();
    var cTotal = 0.00;
    var botQty = 0;
    for (var i = 0; i < cartContents.length; i++) { 
      var tTOtals = (parseFloat(cartContents[i].price) * parseFloat(cartContents[i].qty)).toFixed(2);
      var idx = cartContents.indexOf(cartContents[i]);
      botQty += parseInt(cartContents[i].botCount);
      $('#orderSummary').append("<tr style='border-bottom: 1px solid gray;padding-bottom: 1em;'>"+
                           "<td style='overflow: hidden;'><img class='order-img' src="+ cartContents[i].src +"><span class='badge itemCount'>"+ cartContents[i].qty +"</span></td>"+
                           "<td style='overflow: hidden;padding: 2px 20px;'><h4 style='font-size: 16px;'>"+ cartContents[i].desc +"</h4></td>"+                          
                           "<td style='overflow: hidden;'>$"+ (parseFloat(cartContents[i].price) * parseFloat(cartContents[i].qty)).toFixed(2) +"</td>"+
                           "<td style='overflow: hidden;'><a href='javascript:;' class'remove-from-order' onclick='removeFromSummary(id)' id="+ idx +"><br><br><span style='color: #737373;'>&#x2715;</span></a></td>"+
                           "</tr>"                         
                           );
                           cTotal = parseFloat(cTotal) + parseFloat(tTOtals);
                           //console.log(jQuery.type(tTOtals));
     }

     if ($('#freebie').length === 0 && cartContents.length > 0) {
      addFree();
    }
     document.getElementById("subTots").textContent = cTotal;
     
     document.cookie = "botqty="+botQty;
     if (parseInt(cTotal) < 150){
        
    
   $("#shipping").val("0");
  
         document.getElementById("shipFee").textContent = "9.95";
        $("#ship").show();
      
     } else {
        $("#shipping").val("995");
     }


     var shipf = parseFloat(document.getElementById("shipFee").innerText);
     var ort = parseFloat(cTotal) + shipf;
     document.getElementById("orderTotal").textContent = ort;
    var strOrt = ort.toString();
   var amount = strOrt.replace('.','');
  omount = amount;
}
}

sumPop();

function addFree(){
  $('#orderSummary').append("<tr id='freebie' style='border-bottom: 1px solid gray;padding-bottom: 1em;'>"+
  "<td style='overflow: hidden;'><img class='order-img' src='components/img_assets/kaisercoach/kaisercoach.jpg'><span class='badge itemCount'>1</span></td>"+
  "<td style='overflow: hidden;padding: 2px 20px;'><h4 style='font-size: 14px; line-height: 1.4;'>FREE - 30-day KaiserCoach Trial <br>($79 Value)<br> <span class='glyphicon glyphicon-tag'></span> App Access</h4></td>"+                          
  "<td style='overflow: hidden;'>$0.00</td>"+
  "<td style='overflow: hidden;'>&nbsp;</td>"+
  "</tr>"                         
  );
}


$("#couponLink").click(function(){
    $("#coupon").toggle("swing");
});

$("#relog-link").click(function(){
  $("#relog-form").toggle("swing");
});

$("#relog-button").click(function(event){
  event.preventDefault();
  var me = $(this);
  me.html('<div class="lds-ellipsis"><div></div><div></div><div></div>');
  $("#relog-error").text('');
  $("#relog-error").hide();
  $("#relog-form .form-group").removeClass('has-error');
  var username = $("#user-name");
  var password = $("#user-password");
  var valid = true;
    if (username.val() === "" | username.val() === undefined){
        username.parent().addClass('has-error');
        valid = false;
    }

    if (password.val() === "" | password.val() === undefined){
      password.parent().addClass('has-error');
      valid = false;
    }

    if (valid){
      let email = username.val();
      let pwx = encode(password.val());
      $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/user.php',
       
        crossDomain: true,
        data: {'email': email, 'pw': pwx},
        dataType: 'json',
        success: function(data) {
          
         console.log(data);
          
        
            if (data.result) {
              document.cookie = "kca=" + data.kaisercoach;
              var json_str = JSON.stringify(data.user);
              createCookie('usr_d', json_str, 30);
              window.location.href = "/stage/user-checkout.html";
           
            } else {
              me.html('Log In');
              $("#relog-error").text('Please Provide Correct Login Details');
              $("#relog-error").show();
              return false;
            }
        },
        error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {

            console.log(xhr);
        }

        }); //end AJAX
    } else {
      me.html('Log In');
              $("#relog-error").text('Username/Password Required');
              $("#relog-error").show();
              return false;
    }

});


$("#xxx").click(function(event){
    event.preventDefault();
    var form = document.getElementById('checkoutForm');
    form.submit();
});

function removeFromSummary(id){
    cartContents.splice(id, 1);
    var jsonStr = JSON.stringify( cartContents );
    sessionStorage.setItem( "cart", jsonStr );
  
     var cartValue = sessionStorage.getItem( "cart" );
     var cartObj = JSON.parse( cartValue );
     document.cookie = "cartContents="+cartValue+";path=/";
     
  
    
    sumPop();
  }