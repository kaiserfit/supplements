$(document).ready(function() {
    $('html,body').animate({
           scrollTop: $(window).scrollTop() + 350
   
       });
   
      document.cookie="refPage=supplements.html";
   });
   $(".buyBtn").click(function() {
       var supp = $(this).data("product");
       // var page = supp+".html";
       var ref = supp+".html";
       document.cookie="refPage="+ref;
       window.location.hash=supp;
       //$("#mainContent").html("");
       //$("#mainContent").load(page);
      });
   
   
   
   