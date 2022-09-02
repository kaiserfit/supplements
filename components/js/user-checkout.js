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

  const digital = Array.from({length: 100}, (_, index) => index + 1); // all skus from 1-100 are digital products
  
  
  function clearCart(){
    cart = [];
    var jsonStr = JSON.stringify( cart );
    sessionStorage.setItem( "cart", jsonStr );
  
     var cartValue = sessionStorage.getItem( "cart" );

     document.cookie = "cartContents="+cartValue+";path=/";
  }


        var json_str = getCookie('usr_d');
        var arr = JSON.parse(json_str);
        const cname = arr[0].cname;
        const cid = arr[0].cid;
        const last4 = arr[0].last4
        document.cookie = "cname="+cname;
        $("#user-name").text(cname);
        $("#last4").text(last4);

cartContents = [];
var cartValue = sessionStorage.getItem( "cart" );
if (cartValue !== null) {
  var cartObj = JSON.parse( cartValue );
  cartContents = cartObj;
  //document.cookie = "cartContents="+cartValue+";path=/";
  //var ccc = getCookie("cartContents");


  
 
} else {
 
  console.log("no Cart Items Detected");
}


var omount = '';
function sumPop() {
  if (cartContents.length === 0){
    $('#order-body').html("<h4>No Items in Cart</h4>");
    $('#order-table tfoot').html('');
    $("#btnStripe").prop('disabled', true);
  } else {

 

    $('#order-body').empty();
    $("#ship").hide();
    document.getElementById("orderTotal").textContent = '';
    document.getElementById("shipFee").textContent = "0";
    var cTotal = 0.00;
    var botQty = 0;
    var dCount = 0;
    var suppTotal = 0.00;
    for (var i = 0; i < cartContents.length; i++) { 
      var tTOtals = (parseFloat(cartContents[i].price) * parseFloat(cartContents[i].qty)).toFixed(2);
      
      var digi = cartContents[i].skuid;
     
      
     
      var idx = cartContents.indexOf(cartContents[i]);
      botQty += parseInt(cartContents[i].botCount);
      $('#order-body').append("<tr style='border-bottom: 1px solid #e5e4e2;padding-bottom: 1em;'>"+
                           "<td style='overflow: hidden;'><img width='80' height='80' src="+ cartContents[i].src +"><span class='badge itemCount'>"+ cartContents[i].qty +"</span></td>"+
                           "<td style='overflow: hidden;padding: 2px 20px;'><h4 style='font-size: 16px;'>"+ cartContents[i].desc +"</h4></td>"+                          
                           "<td style='overflow: hidden;'>$"+ (parseFloat(cartContents[i].price) * parseFloat(cartContents[i].qty)).toFixed(2) +"</td>"+
                           "<td style='overflow: hidden;'><a href='javascript:void(0);' role='button' onclick='removeFromSummary(id)' id="+ idx +"><span class='text-muted' style='font-weight:400; font-size: 1em;'>&#x2715;</span></a></td>"+
                           "</tr>"                         
                           );
                           cTotal = parseFloat(cTotal) + parseFloat(tTOtals);
                           if($.inArray(digi, digital) === -1){ //not a digital product
                          //  if(!$.isNumeric(digi)){ //not a digital product
       
                            suppTotal = parseFloat(suppTotal) + parseFloat(tTOtals);
                            
                           } else {
                            dCount++;
                           }
                       
                           //console.log(jQuery.type(tTOtals));
     }

     console.log("digital product count: "+ dCount);
     console.log("physical product amount: "+ suppTotal);
     console.log("total purchase amount: "+ cTotal);
     document.getElementById("subTots").textContent = cTotal;
     
     document.cookie = "botqty="+botQty;
     if (parseInt(suppTotal) > 1 && parseInt(suppTotal) < 150){
        
    
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


function removeFromSummary(id){
    cartContents.splice(id, 1);
    var jsonStr = JSON.stringify( cartContents );
        sessionStorage.setItem( "cart", jsonStr );
     var cartValue = sessionStorage.getItem( "cart" );
     document.cookie = "cartContents="+cartValue+";path=/";
    sumPop();
  }


  function checkout(){
    $(".alert-danger").addClass('hidden');
    $("#auth-error").addClass("hidden");
    var items = cartContents.length;
    
      var auth = $("#order-auth").is(":checked");
      if (items == 0){
                $(".alert-danger").html('<p>Nothing to purchase!</p>');
                $(".alert-danger").removeClass('hidden');
                return false;
      }
      if (!auth){
         $("#auth-error").removeClass("hidden");
      } else { //process the payment
        $('#order-btn').html('<div class="lds-ellipsis"><div></div><div></div><div></div>');
        var items = JSON.stringify(cartContents);
        var pdate = getUserDate();
        $.ajax({
            type: 'POST',
            // url: 'https://kaisercoach.com/api/payment-test.php',
            url: 'https://pay.kaiserfitapp.com/api/payment.php',
            crossDomain: true,
            
            data: {'cid': cid, 'pdate': pdate, 'items': items},
            dataType: 'json',
            success: function(data) {
              
             
              if (data.result){
                document.cookie = "cName="+cname;
                document.cookie = "cid="+cid;
               
                document.cookie = "orderid="+data.orderNum;
                document.cookie = "cmail="+data.email;
                clearCart();

                var x = getCookie('recipe');
                if (x == "true"){
                  
                  document.cookie = 'recipe=false';
                  var link = getCookie('recipelink');
                  document.cookie = 'recipelink=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  window.location.href= link;
                } else {
                  window.location.href= "/push/thank-you.html";
                  
                }


              } else {
                $(".alert-danger").html('<p>'+ data.message +'</p>');
                $(".alert-danger").removeClass('hidden');
              } 

            }, error: function(data) {
                console.log(data);
            }

        });
      }
  }