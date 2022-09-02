
  $(document).ready(function() {
    document.cookie="refPage=meal-masterplan.html";
    $("#footerSection").hide();

});
const months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"


];

const numProg = 15;
const pct = $("#progPct").text();
$("#progText").text($("#progPct").text());



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

var json_str = getCookie('usr_d');
var arr = JSON.parse(json_str);
// var cname = arr[0].cname;
// var cid = arr[0].cid;
const lessonid = 2;
const numCourse = 6;

getProgress();
function getProgress(){
  $.ajax({
    type: 'POST',
    url: 'https://kaisercoach.com/api/programs.php',
    crossDomain: true,
    data: {'cmd': 'progress','customerid': cid,'lessonid': lessonid},
    dataType: 'json',
    success: function(data) {
        var res = 0;
        var xx = data.progress;
      if (xx == null){
        console.log("no data");
      } else {
        res = data.progress.length;
      }
    
      if (res > 0) {
      
        if (res === 6){
          $("#progStat").removeClass("label-info");
          $("#progStat").addClass("label-success");
          $("#progStat").text("Completed");
          $("#progPct").addClass("progress-bar-success");
          

        }

        $.each(data.progress, function(index, item) {
          $(".bullet-stat:eq("+ (parseInt(item.numLesson) - 1) +")").html('<i class="fa fa-check-circle" style="font-size:1.2em;color: #7CFC00;"></i>');
      });
 
       
        let xdate = new Date(data.progress[0]["watch_date"]);
        let xmonth = xdate.getUTCMonth();
        let xday = xdate.getUTCDate();
        let xyear = xdate.getUTCFullYear();
        let xhour = xdate.getHours();
        let xmins = xdate.getUTCMinutes();
        let dayPart = (xhour > 11) ? "PM" : "AM";
        let last_watch = months[xmonth] + ' ' + xday + ' '+ xyear + ' ' + xhour + ':'+xmins + ' '+dayPart;
        $("#watchDate").text(last_watch);
      let progress = ((res/numCourse) * 100).toFixed();
      $("#progText").text(progress + '%'); 
      $("#progPct").text(progress + '%'); 
      $("#progPct").width(progress +'%');
        
     
     
      
      } else {
        $("#progNum").text("0"); 
        $(".bullet-stat").html("&#9711;");
      }
    
    }, error: function(xhr, data, jqXHR) {
      console.log(xhr);
      console.log(data);
      console.log(jqXHR);
    }

  });
}
$(".course-link").click(function(){
  var c = $(this).data("lesson");

  window.location.href= "/Meal-Masterplan/lessons.html?c=" + c;
  // $(".course-link").removeClass(" active");
  // $(this).addClass("active");
  // var toggled = $(".courses").hasClass("toggled");

  // if (toggled === false) {
  //   $("#progressDiv").hide();
  //   $(".courses").addClass("toggled");
  // }

  
});


$("#canvass-link").click(function(){
  $("#progressDiv").show();
  $(".course-link").removeClass(" active");
  $(".courses").removeClass(" toggled");
});

$("#menu-toggle").click(function(){
  var left = $(this).hasClass("glyphicon-circle-arrow-left");
  if (left){
    $(this).removeClass("glyphicon-circle-arrow-left");
    $(this).addClass("glyphicon-circle-arrow-right");
  } else {
    $(this).removeClass("glyphicon-circle-arrow-right");
    $(this).addClass("glyphicon-circle-arrow-left");
  }


  $("#course-content").toggleClass("sideClose");
  var btn = $("#course-content").hasClass("sideClose");
  if (btn) {
    $("#sideMenuToggle").show();
  } else {
    $("#sideMenuToggle").hide();
  }
});


$("#sideMenuToggle").click(function(){
  $("#menu-toggle").trigger( "click" );
});