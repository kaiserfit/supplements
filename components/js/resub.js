$(document).ready(function(){
    console.log("resub");
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

var json_str = getCookie('usr_d');
var arr = JSON.parse(json_str);
var cname = arr[0].cname;
var cid = arr[0].cid;
// console.log(cid);
$("#namex").text(cname);

$(".resub-btn").click(function(){
 
  var price = $(this).data("price");
  $.ajax({
    type: 'POST',
    url: 'https://kaisercoach.com/api/resubscribe.php',
   
    crossDomain: true,
    data: {'cid': cid, 'price': price},
    dataType: 'json',
    success: function(data) {
      if (data.result){
        $("#rStat").text("Subscription Activated!");
        document.getElementById("mbody").innerHTML = "<h2 style='color: green;'>&#10003;</h2>";
        document.cookie="kca=active";
        window.location.href = "/stage/kaiserfit.php";
        document.cookie="refPage=kaiserfit.html";
      } else {
        $("#rStat").text("Subscription Failed");
        document.getElementById("mbody").innerHTML = "<h4 style='color: #000;'>Please Check your Card Details</h4>";
      }
    },
    error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {

        console.log(xhr);
    }

  }); //ajax
});