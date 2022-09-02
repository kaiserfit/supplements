$(document).ready(function() {
 

  document.cookie="refPage=home.html";
});
$(".suppBtn").click(function() {
  window.scrollTo(0, 0);
  window.location.hash = "supplements";
   // $("#mainContent").html("");
   // $("#mainContent").load("supplements.html");
  });

  $("#shopBtn").click(function() {
    window.scrollTo(0, 0);
    window.location.hash = "supplements";
    $("#mainContent").html("");
    $("#mainContent").load("supplements.html");
  });