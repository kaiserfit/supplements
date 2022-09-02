

$( document ).ready(function() {
  var price=0;
  var uid = "";
  var tokenx = "";
     document.getElementById("up1-box").style.display = 'none';
     function showUp(){
       document.getElementById("up1-box").style.display = 'block';
       
     }
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
  var username = getCookie("cName");
       var fsw = getCookie("fs-watched");
      var cid = getCookie("cid");
         var userToken = getCookie("userToken");
       tokenx = userToken;
            if (cid != "") {
   uid = cid;
              console.log(username);
  }else { //no user id present
    console.log("hello visitor");
  }
        if (fsw != 0) {
   document.getElementById("up1-box").style.display = 'block';
  }else { //initiate timer of vid
    document.cookie = "fs-watched=1";
    setTimeout(showUp, 570000);
  }
  if (username != "") { //user exists
    console.log("welcomeback");
   document.getElementById("user").textContent=username;
  } else {
     console.log("hello visitor");
   	 document.getElementById("user").textContent="Visitor";
  }
}
     
     checkCookie();
  //  $.ajax({
  //   type: 'POST',
  //   url: 'https://pay.kaiserfitapp.com/stripetest/db.php',
  //   crossDomain: true,
  //   data: {'action': 'pLoad','fpage': 'U1','tokenx': tokenx},
  //   dataType: 'json',
  //   success: function(response) {
  //     console.log(response.data);
  //   },
  //    error: function(response){
  //      console.log(response.data);
  //    }
  //     }); //end ajax post
    function integro(addonid){
 	$.post("https://hook.integromat.com/hrmj8ohgwuxd3mtkblxbvtmrc49h4vvm",{'customer_id': uid, 'product_id':addonid},function(data) {
		
		console.log(data);
		});
  }
  function get_upsell(addonid, page, track){
    var userA = addonid;
    var dd = {'cid': uid,'addonid': addonid,'tokenx': tokenx,'track': track, 'useraction': userA}
    $.ajax({
    type: 'POST',
    url: 'https://pay.kaiserfitapp.com/stripe/upsellLive.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
      integro(addonid)
    	console.log(data.message);
    	_tfa.push({notify: 'event', name: 'u1_purchase', id: 1376421});
    price = data.price;
      // gtag('event', 'conversion', {
      // 'send_to': 'AW-808125221/scGdCITB2-8BEKWGrIED',
      // 'value': price,
      // 'currency': 'USD',
      // 'transaction_id': data.receipt
  		// 		});
      //ultracart
 	//fb tracking
      fbq('track', 'Purchase', {value: data.price, currency: 'USD'});
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
			window.location.href = "/stage/upsell-2.html";
    },
      error: function(data){
    window.location.href = "/stage/upsell-2.html";
    }
      
    });
    //	window.location.href="u2-8-bottles";
  }
  
      $('.up1btn').click(function(){
        var addonid = $(this).data('id');
        var page=$(this).data('page');
         var track = $(this).data('track');
            get_upsell(addonid, page, track);
      });
  
  $('.d1btn').click(function(){
        var addonid = $(this).data('id');
        var page=$(this).data('page');
         var track = $(this).data('track');
            get_upsell(addonid, page, track);
      });
  	
  $('.skip').click(function(){
         var track = $(this).data('track');
                var dd = {'action': 'uLoad','fpage': 'U1','tokenx': tokenx, 'user_action': 'skipped'};
                window.location.href = "/stage/u1-d1.html";
    //     $.ajax({
    // type: 'POST',
    // url: 'https://pay.kaiserfitapp.com/stripetest/db.php',
    // crossDomain: true,
    // data: dd,
    // dataType: 'json',
    // success: function(response) {
    //   console.log(response.data);
    //   window.location.href = "/stage/u1-d1-fatlossstacks-stripe";
    // },
    //  error: function(response){
    //     console.log(response.data);
    //   window.location.href = "/stage/u1-d1-fatlossstacks-stripe";
    //  }
    //   });
       }); //u1skip
      //  window.location.href = "/stage/u1-d1-fatlossstacks-stripe";
		}); //end doc ready

