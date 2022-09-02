$( document ).ready(function() {
			var sid = "";
  var uid = "";
   var un = "";
  var obx = 0;
  var tokenx = "";
  var acid = "";
  var botqty = "";
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
   	var ob = getCookie("obx");
      var cid = getCookie("cid");
       var cd = getCookie("sid");
        var userToken = getCookie("userToken");
       tokenx = userToken;
       if (cid != "") {//user exists
   				uid = cid;
       	un = username;
         obx = ob;
         sid  = cd;
          if($("#yt").length){
           document.getElementById("yt").innerText = un;
         }
         if($("#u3name").length){
           document.getElementById("u3name").innerText = un;
         }
         if($("#u1d1name").length){
           document.getElementById("u1d1name").innerText = un;
         } 
         
         
         
 		 				}else { //no user id present
              console.log("hello visitor");
               if($("#u1d1name").length){
           document.getElementById("u1d1name").innerText = "visitor";
         } 
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
  function u4ia(){
    if (obx==1){ //orderbump ticked
      //window.location.href = "/stage/u4-forever-fat-loss-stripe";
      var bqty = parseInt(botqty);
    
         if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-biotics-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-biotics-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-biotics-12.html";
        }
    } else if (obx==0) {
    console.log("no-orderbump");
      window.location.href = "/stage/u4kfc.html";
    } else {
      console.log("Kaiserfit");
    }
    
  } //end u4ia
   if (un != ""){
   console.log("up");
   }
  function findNextPage(fstep){
    var bqty = parseInt(botqty);
    switch (fstep){
      case "u2":
      
       // window.location.href = "/stage/u3-meal-master-class-stripe";

       if (bqty >= 1 && bqty <= 2){
        window.location.href = "/stage/queen-pure-collagen-3.html";
      }
      if (bqty >= 3 && bqty <= 5){
        window.location.href = "/stage/queen-pure-collagen-6.html";
      }
      if (bqty >= 6){
        window.location.href = "/stage/queen-pure-collagen-12.html";
      }
        break;
       
      case "d1":
       u4ia();
        break;
        case "d2":
    
        if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-pure-collagen-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-pure-collagen-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-pure-collagen-12.html";
        }
        break;
        case "d3":
       u4ia();
        break;
      case "u3":
       u4ia();
        break;
          case "u4":
       window.location.href = "/stage/thank-you.html";
        break;
      default:
        console.log("journey stop");
        break;
    }
  }
  
     function integro(addonid){
 	$.post("https://hook.integromat.com/hrmj8ohgwuxd3mtkblxbvtmrc49h4vvm",{'customer_id': uid, 'product_id':addonid},function(data) {
		
	
		});
  }
  function get_upsell(addonid, fstep, taboola_id, page, track, desc){
         var userA = addonid;
    var dd = {'cid': uid,'addonid': addonid,'tokenx': tokenx,'track': track, 'useraction': userA, 'desc': desc};

    	$.ajax({
    type: 'POST',
    url: 'https://queenformula.net/api/upsell.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
      
      
      // gtag('event', 'conversion', {
      //   'send_to': 'AW-808125221/_3zVCN7a6tkCEKWGrIED',
      //   'value': data.price,
      //   'currency': 'USD',
      //   'transaction_id': data.receipt
      // });
      // integro(addonid);
  //  _tfa.push({notify: 'event', name: taboola_id, id: 1376421});
    
      
            
 	//fb tracking
    //  fbq('track', 'Purchase', {value: data.price, currency: 'USD'});
      
      
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
    
			findNextPage(fstep);
    },
        error: function (data, xhr,jqXHR, ajaxOptions, thrownError) {
       
      	findNextPage(fstep);
        
      }
        
      });

  } //end get_upsell
  function get_downsell(planid, fstep, taboola_id, page, track, desc){
             var userA = planid;
    var dd = {'cid': uid,'addonid': planid,'tokenx': tokenx,'track': track, 'useraction': userA, 'desc': desc};
 		
    $.ajax({
    type: 'POST',
    url: 'https://queenformula.net/api/downsell.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
    //   gtag('event', 'conversion', {
    //     'send_to': 'AW-808125221/_3zVCN7a6tkCEKWGrIED',
    //     'value': data.price,
    //     'currency': 'USD',
    //     'transaction_id': data.receipt
    // });
    //    integro(planid);
   
     
     
  //  _tfa.push({notify: 'event', name: taboola_id, id: 1376421});
    
      
             //ultracart
   	//fb tracking
      // fbq('track', 'Purchase', {
      //   value: data.price,
      //    currency: 'USD'}
      //    );
    
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
    
			findNextPage(fstep);
    },
      error: function(data) {
      	findNextPage(fstep);
      }
    });
  } //end downsell func
  
  
  
    $('.kfc').click(function(){
        var plan = $(this).data('id');
       $.ajax({
    type: 'POST',
    url: 'https://queenformula.net/api/kfc.php',
    crossDomain: true,
    data: {'uid': uid,'plan': plan},
    dataType: 'json',
    success: function(data) {
      console.log(data);
      
      // integro(addonid);		
      //        console.log(data);
      //          gtag('event', 'conversion', {
      // 'send_to': 'AW-808125221/scGdCITB2-8BEKWGrIED',
      // 'value': 0.0,
      // 'currency': 'USD',
      // 'transaction_id': data.receipt
  		// 		});
        //  _tfa.push({notify: 'event', name: 'u4kfc_purchase', id: 1376421});
           
	//fb tracking
    //  fbq('track', 'Purchase', {value: 0.00, currency: 'USD'});
 
      
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
    
			window.location.href = "/stage/thank-you.html";
    }, 
      error: function(data) {
      	window.location.href = "/stage/thank-you.html";
      }
       });
 		});
  
      $('.d1btn').click(function(){
        var desc = $(this).data('desc');
       var track = $(this).data('track');
     var addonid = $(this).data('id');
         var fstep = $(this).data('idx');
      var taboola_id = $(this).data('taboola');
         var page = $(this).data('page');
           get_upsell(addonid, fstep, taboola_id, page, track, desc);
  
		});
  
    $('.dsbtn').click(function(){
      var desc = $(this).data('desc');
      var track = $(this).data('track');
      var planid = $(this).data('id');
         var fstep = $(this).data('idx');
     var page = $(this).data('page');
     		var taboola_id = $(this).data('taboola');
           get_downsell(planid, fstep, taboola_id, page, track, desc);
   
   
  
		});
  
    $('.ty-btn').click(function(){
      var desc = $(this).data('desc');
        var track = $(this).data('track');
        var addonid = $(this).data('id');
      var useraction = addonid;
      $("#ldr").removeClass("glyphicon-ok");
      $("#ldr").addClass("glyphicon-alert");
      $('#modPurchase').modal('show');
      $.ajax({
    type: 'POST',
    url: 'https://queenformula.net/api/upsell.php',
    crossDomain: true,
    data: {'cid': uid,'addonid': addonid,'track': track,'tokenx': tokenx,'useraction': useraction,'acid': acid, 'desc': desc},
    dataType: 'json',
    success: function(data) {
    //   gtag('event', 'conversion', {
    //     'send_to': 'AW-808125221/_3zVCN7a6tkCEKWGrIED',
    //     'value': data.price,
    //     'currency': 'USD',
    //     'transaction_id': data.receipt
    // });
    //    integro(addonid);
 
    
  //  _tfa.push({notify: 'event', name: taboola_id, id: 1376421});
    
      
	//fb tracking
     // fbq('track', 'Purchase', {value: data.price, currency: 'USD'});
    
      
      $("#ldr").removeClass("glyphicon-alert");
      $("#ldr").addClass("glyphicon-ok");
    
			$('#modPurchase').modal('hide');
    },
        error: function (data, xhr,jqXHR, ajaxOptions, thrownError) {
       
      		$('#modPurchase').modal('hide');
        
      }
        
      });
      $(this).attr('disabled', 'disabled');
      $(this).attr('value', 'Addon Purchased');
      $(this).val('Addon Purchased');
       $(this).text('Addon Purchased');
      		
		});
  
   
  
  
   $('.u4-check').click(function(){
       
      

 				 var track = $(this).data('track');
  var dd = {'action': 'uLoad','fpage': track,'tokenx': tokenx, 'user_action': 'skipped'};  
  
    $.ajax({
    type: 'POST',
     url: 'https://queenformula.net/api/curly.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(response) {
      console.log(response.data);
    
     	u4ia();
    },
     error: function(response){
        console.log(response.data);
      	u4ia();
     }
      }); //end ajax
  
		}); //end u4check
  

    function sessionSkip(dd){
     
      $.ajax({
        type: 'POST',
        url: 'https://queenformula.net/api/curly.php',
        crossDomain: true,
        data: dd,
        dataType: 'json',
        success: function(data) {
          console.log(data);  
        },
         error: function(data){         
            console.log(data);
               }
          }); //end ajax
    }

  $('.skip').click(function(){
    var track = $(this).data('track');
   
  var dd = {'action': 'uLoad','fpage': track,'tokenx': tokenx, 'user_action': 'skipped'};  
 
   // sessionSkip(dd);
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
        window.location.href = "/stage/queen-formula-u1d2-12.html";
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
  });//end skip


  $('.dskip').click(function(){
    var track = $(this).data('track');
   
  var dd = {'action': 'uLoad','fpage': track,'tokenx': tokenx, 'user_action': 'skipped'};  
  // sessionSkip(dd);
   
  var bqty = parseInt(botqty);
        switch (track) {
        case "U2": 
    

        if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-night-burner-downsell-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-night-burner-downsell-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-night-burner-downsell-12.html";
        }
          	break;
           case "U3": 
        if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-pure-collagen-downsell-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-pure-collagen-downsell-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-pure-collagen-downsell-12.html";
        }
          	break;
          case "U4": 
      
        if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-biotics-downsell-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-biotics-downsell-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-biotics-downsell-12.html";
        }
          	break;
          case "U2D1": 
      
        if (bqty >= 1 && bqty <= 2){
          window.location.href = "/stage/queen-pure-collagen-3.html";
        }
        if (bqty >= 3 && bqty <= 5){
          window.location.href = "/stage/queen-pure-collagen-6.html";
        }
        if (bqty >= 6){
          window.location.href = "/stage/queen-pure-collagen-12.html";
        }
          	break;
        case "U3D1" :
          u4ia();
          break;
        case "U4D1":
          window.location.href = "/stage/thank-you.html";
      		break;
        default: 
          break;
          
          
				} //end switch
      
  			
     
  
  
  
  
  
  });
  //end dskip
});
