

$( document ).ready(function() {
  var price=0;
  var uid = "";
  var tokenx = "";
  var acid = "";
  var botqty = "";
     document.getElementById("up1-box").style.display = 'none';
     function showUp(){
       document.getElementById("up1-box").style.display = 'block';
       
     }

     function sessionLoad(tokenx){
      $.ajax({
        type: 'POST',
        url: 'https://queenformula.net/api/curly.php',
        crossDomain: true,
        data: {'action': 'pLoad','fpage': 'U1','tokenx': tokenx},
        dataType: 'json',
        success: function(response) {
          console.log(response.data);
        },
         error: function(response){
           console.log(response.data);
         }
          }); //end ajax post
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
      //  if (tokenx != ""){
      //   sessionLoad(tokenx);
      //  }
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
  var acidx = getCookie("acid");
  if (acidx != ""){
      acid = acidx;
  }
  var botq = getCookie("botqty");
  if (botq != ""){
      botqty = botq;
              }
}
     
     checkCookie();
  

      function nextPage(){
        switch(botqty){
          case "1":
            window.location.href = "/stage/queen-night-burner-3.html";
            break;
          case "3":
            window.location.href = "/stage/queen-night-burner-6.html";
            break;
             case "6":
            window.location.href = "/stage/queen-night-burner-12.html";
            break;
          default:
            window.location.href = "/stage/queen-night-burner-3.html";
            break;
        } //end switch
      }
    function integro(addonid){
 	$.post("https://hook.integromat.com/hrmj8ohgwuxd3mtkblxbvtmrc49h4vvm",{'customer_id': uid, 'product_id':addonid},function(data) {
		
		
		});
  }
  function get_upsell(addonid, track, desc){
   
     
    
    var userA = addonid;
    var dd = {'cid': uid,'addonid': addonid,'tokenx': tokenx,'track': track, 'useraction': userA,'desc': desc};
    $.ajax({
    type: 'POST',
    url: 'https://queenformula.net/api/upsell.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
      // fbq('track', 'Purchase', {
      //   value: data.price,
      //    currency: 'USD'}
      //    );
     // integro(addonid);
    	console.log(data.message);
    
    price = data.price;
  //   gtag('event', 'conversion', {
  //     'send_to': 'AW-808125221/_3zVCN7a6tkCEKWGrIED',
  //     'value': data.price,
  //     'currency': 'USD',
  //     'transaction_id': data.receipt
  // });
     
 
     
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
			nextPage();
    },
      error: function(data){
        
        nextPage();
    }
      
    });
   //window.location.href = "/stage/upsell-2.html";
  }
  
      $('.up1btn').click(function(){
        var addonid = $(this).data('id');
        var page=$(this).data('page');
         var track = $(this).data('track');
            get_upsell(addonid, track);
      });
  
  $('.d1btn').click(function(){
    var desc = $(this).data('desc');
        var addonid = $(this).data('id');
        var page=$(this).data('page');
         var track = $(this).data('track');
            get_upsell(addonid, track, desc);
      });


      function sessionSkip(dd){
        $.ajax({
          type: 'POST',
          url: 'https://queenformula.net/api/curly.php',
          crossDomain: true,
          data: dd,
          dataType: 'json',
          success: function(response) {
            console.log(response.data);
          
          },
           error: function(response){
            console.log(response.data);
           }
            }); //end ajax post
      }
  	
  $('.skip').click(function(){
         var track = $(this).data('track');
                var dd = {'action': 'uLoad','fpage': 'U1','tokenx': tokenx, 'user_action': 'skipped'};
            //sessionSkip(dd);
          var bqty = parseInt(botqty);
            if (track === "U1") {
              if (bqty >= 1 && bqty <= 2){
                window.location.href = "/stage/queen-formula-u1d1-3.html";
              }
              if (bqty >= 3 && bqty <= 5){
                window.location.href = "/stage/queen-formula-u1d1-6.html";
              }
              if (bqty >= 6){
                window.location.href = "/stage/queen-formula-u1d1-12.html";
              }
            }
         if (track === "U1D1") {
          if (bqty >= 1 && bqty <= 2){
            window.location.href = "/stage/queen-formula-u1d2-3.html";
          }
          if (bqty >= 3 && bqty <= 5){
            window.location.href = "/stage/queen-formula-u1d2-6.html";
          }
          if (bqty >= 6){
            window.location.href = "/stage/queen-formula-u1d3-12.html";
          }

          
          
         }
          
            
            if (track === "U1D2"){
              if (bqty >= 1 && bqty <= 2){
                window.location.href = "/stage/queen-formula-u1d3-3.html";
              }
              if (bqty >= 3 && bqty <= 5){
                window.location.href = "/stage/queen-formula-u1d3-6.html";
              }
              if (bqty >= 6){
                window.location.href = "/stage/queen-formula-u1d3-12.html";
              }
            
           }
                
           
              if (track === "U1D3"){
           u4ia();
           }
       }); //u1skip
    
		}); //end doc ready

