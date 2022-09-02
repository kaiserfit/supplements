$(document).ready(function(){
 
    //
    
   // console.log(cartObj.length);
   
  //
   
  
  
  $("#footerSection").hide();
  
  
   
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
  
       function checkCookie() {
        var uToken = getCookie("userToken");
      var tokenx = uToken;
      var page = getCookie("refPage");
     
  
      if (page != "") {
       
        $("#mainContent").load(page);
      } else {
       
        window.location.hash = "#kaiser-coach";
        $("#mainContent").load("kaiser-coach.php");
        document.cookie="refPage=kaiser-coach.php";
      }
    }

   // $("#mainContent").load("home.html");
  checkCookie();
  
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
    
     document.getElementById("cTotals").innerHTML = "<span style='color: green; font-weight: 500;text-align: right;'>$"+parseFloat(cTotal)+"</span>";
  
  }
  
  
  $('#modCart').on('shown.bs.modal', function (e) {
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
     document.getElementById("cTotals").innerHTML = "<span style='color: green; font-weight: 500;text-align: right;'>$"+parseFloat(cTotal)+"</span>";
  });
  const pages = [
    {'id': 'home', 'page':'home.html'},
    {'id': 'members', 'page':'kaiserfit.html'},
    {'id': 'kaisercoach', 'page':'kcc.php'},
    {'id': 'kaiser-coach', 'page':'kaiser-coach.php'},
    {'id': 'blogs', 'page':'blogs.html'},
    {'id': 'supplements', 'page':'supplements.html'},
    {'id': 'queenformula', 'page':'queenformula.html'},
    {'id': 'queen-night-burner', 'page':'queen-night-burner.html'},
    {'id': 'queen-focus', 'page':'queen-focus.html'},
    {'id': 'pure-collagen', 'page':'pure-collagen.html'},
    {'id': 'queen-biotics', 'page':'queen-biotics.html'},
    {'id': 'blog-jeanna', 'page':'blogs/blog-jeanna.html'},
    {'id': 'blog-marina', 'page':'blogs/blog-marina.html'},
    {'id': 'blog-tess', 'page':'blogs/blog-tess.html'},
    {'id': 'blog-nikita', 'page':'blogs/blog-nikita.html'},
    {'id': 'blog-faith', 'page':'blogs/blog-faith.html'},
    {'id': 'blog-renee', 'page':'blogs/blog-renee.html'},
    {'id': 'blog-rabia', 'page':'blogs/blog-rabia.html'},
    {'id': 'blog-jen', 'page':'blogs/blog-jen.html'},
    {'id': 'blog-rebeca', 'page':'blogs/blog-rebeca.html'},
    {'id': 'blog-kendra', 'page':'blogs/blog-kendra.html'},
    {'id': 'blog-carly', 'page':'blogs/blog-carly.html'},
    {'id': 'blog-lariena', 'page':'blogs/blog-lariena.html'},
    {'id': 'blog-linda', 'page':'blogs/blog-linda.html'},
    {'id': 'blog-maddison', 'page':'blogs/blog-maddison.html'},
    {'id': 'blog-stephanie', 'page':'blogs/blog-stephanie.html'},
    {'id': 'initial', 'page':'step1.html'},
    {'id': 'account', 'page':'account.html'},
   
  
  ];
  
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
    $(window).on('hashchange', function() {
      $("#mainContent").html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
      var from = checkCookie1();
      document.cookie="fromPage="+from;
      var cpage = window.location.hash.substr(1);
      var pageToLoad = getHashVal(cpage);
      
      if(cpage !== "kaiser-coach"){
        $("#topAnchor").show();
      }
       $("#mainContent").load(pageToLoad);

       var x = document.getElementById("myTopnav");
       x.className = "topnav";
        // myFunction();
    });
    $("#home").click(function() {
     // var from = checkCookie1();
     //document.cookie="fromPage="+from;
  
   //   $("#mainContent").html("");
    //  $("#mainContent").load("home.html");
     // myFunction();
  
    //  $("#mainContent").html("");
    //  var from = checkCookie1();
    //  document.cookie="fromPage="+from;
    //  var cpage = window.location.hash.substr(1);
    //  var pageToLoad = getHashVal(cpage);
  
    
    //   $("#mainContent").load(pageToLoad);
    //    myFunction();
     
  });
    $("#blog").click(function() {
      //    $("#mainContent").html("");
      // var from = checkCookie1();
      // document.cookie="fromPage="+from;
      // var cpage = window.location.hash.substr(1);
      // var pageToLoad = getHashVal(cpage);
  
     
      //  $("#mainContent").load(pageToLoad);
      //   myFunction();
       
    });
  
    $("#supplement").click(function() {
    //  var from = checkCookie1();
    //  document.cookie="fromPage="+from;
     // $("#mainContent").html("");
     // $("#mainContent").load("supplements.html");
      // myFunction();
     
  });
  
  
  
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
  
    if (cart.length > 0) {
      window.location.href = "/stage/checkout.html";
    } else {
      alert("No Items in Cart");
    }
     // 
  });
   window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  
  
  
  $('#modStat').on('shown.bs.modal', function (e) {
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "tel") {
        elements[ii].value = "";
      }
    }
  
  });

  $('#ddStat').on('shown.bs.modal', function (e) {
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "tel") {
        elements[ii].value = "";
      }
    }
  
  });




  // window.addEventListener("beforeunload", function(event) { 

  //   document.cookie = "refPage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //  });

  