$(document).ready(function(){

  $("body").css({paddingBottom: "0px"});
    //
    
   // console.log(cartObj.length);
   
  //
  var usr = getCookie('usr_d');


if (usr != ""){
  console.log("welcome back");
} else {
  window.location.href = "/stage/member-login.php";
}
 
  
  // $("#footerSection").hide();
  
  
   
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

  function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
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
       
      
      var page = getCookie("refPage");
     
  
      if (page != "") {
       
        $("#mainContent").load(page);
      } else {
       
        window.location.hash = "#members";
        $("#mainContent").load("members.html");
        document.cookie="refPage=members.html";
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
  var userPrograms = [];
  var json_str = getCookie('usr_d');
  var arr = JSON.parse(json_str);
  const cname = arr[0].cname;
  const cid = arr[0].cid;
  const customerEmail = arr[0].email;
  const customerPhone = arr[0].phone;
  const customerAddress = arr[0].address;
  const customerTown = arr[0].town;
  const customerZip = arr[0].zip;
  const customerCountry = arr[0].country;
  const customerState = arr[0].state;
  

  function refreshData(){

  }

  function getPrograms(){
    $.ajax({
      type: 'POST',
      url: 'https://kaisercoach.com/api/members.php',
      crossDomain: true,
      data: {'cmd': 'programs','cid': cid},
      dataType: 'json',
      success: function(data) {
        var progs = data.userPrograms.length;
        if (progs > 0 || data.userPrograms != null){
          userPrograms = data.userPrograms;
          $('.user-prog').each(function(i, obj){
           let idx = $(this).attr('id');
           let stat = userPrograms.findIndex(x => x.progid === idx);
            if(stat > -1){
              $(this).removeClass('digital-product');
            }
          });
        }
      

      
      }, error: function(data){
        console.log(data);
      }

    });
  }

  function cc(id){ //check userprograms
   
    // var check = id in userPrograms;
    // console.log(check);

   
      if (userPrograms.length > 0){
        var prg = userPrograms.findIndex(x => x.progid === id);
          if (prg > -1){ //user program exists
            var page = progArr.find(x => x.id === id).proghash;
            window.location.hash = page;
          } else {
            var page = progArr.find(x => x.id === id).hash;
            window.location.hash = page;
          }
      } else {
        var page = progArr.find(x => x.id === id).hash;
        window.location.hash = page;
      }
      
  }
  
 
  $('#btnLogOut').click(function(){
    document.cookie = 'usr_d=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'fromPage=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refPage=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'kca=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href="https://kaisercoach.com/#home";
  });
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
    {'id': 'members', 'page':'members.html'},
    {'id': 'queen-greens', 'page':'queen-greens.html'},
    {'id': 'queen-cleanse', 'page':'queen-cleanse.html'},
    {'id': 'kaiserfitclub', 'page':'kaiserfitclub.html'},
    {'id': 'fatloss-super-system', 'page':'Fatloss-SuperSystem.html'},
    {'id': 'food-hacks', 'page':'food-hacks.html'},
    {'id': 'food-hacks-course', 'page':'foodhacks.html'},
    {'id': 'home-workouts', 'page':'home-workouts.html'},
    {'id': 'bonus-gifts', 'page':'bonus-gifts.html'},
    {'id': 'meal-masterplan', 'page':'meal-masterplan.html'},
    {'id': 'meal-masterplan-course', 'page':'mealmasterplan.html'},
    {'id': 'goddess-body-blueprint', 'page':'goddess-body-blueprint.html'},
    {'id': 'goddess-body-blueprint-course', 'page':'goddessbody.html'},
    {'id': 'forever-fatloss', 'page':'forever-fatloss.html'},
    {'id': 'forever-fatloss-course', 'page':'foreverfatloss.html'},
    {'id': 'kaisercoach', 'page':'coach.php'},
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
    {'id': 'account', 'page':'user-account.html'},
   
  
  ];

  const progArr = [
    {'id' : "1", 'proghash' : 'food-hacks', 'hash': 'food-hacks-course'},
    {'id' : "2", 'proghash' : 'meal-masterplan', 'hash': 'meal-masterplan-course'},
    {'id' : "3", 'proghash' : 'forever-fatloss', 'hash': 'forever-fatloss-course'},
    {'id' : "4", 'proghash' : 'goddess-body-blueprint','hash': 'goddess-body-blueprint-course'},
   
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
      $("#mainContent").html("<div class='lds-ellipsis-main'><div></div><div></div><div></div>");
      var from = checkCookie1();
      document.cookie="fromPage="+from;
      var cpage = window.location.hash.substr(1);
      if (cpage == ""){
        window.location.hash = "#members";
      } else {
        var pageToLoad = getHashVal(cpage);
      
        if(cpage !== "kaiser-coach"){
          $("#topAnchor").show();
        }

        if(cpage !== "coach"){
          $('body').css('padding-bottom', '2px');
        }
        window.scrollTo(0, 0);
        if ($('.modal-backdrop').hasClass('in') ){
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          
        }
         $("#mainContent").load(pageToLoad);
        
         if ($("#myTopnav").hasClass('responsive')){
          myFunction();
        }
      }
     
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
  $("#cartError").html('');
    if (cart.length > 0) {
      window.location.href = "/stage/user-checkout.html";
    } else {
      $("#cartError").html('<h4 class="text-danger">No Items in Cart</h4>');
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

  