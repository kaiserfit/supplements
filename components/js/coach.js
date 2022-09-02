$(document).ready(function(){
    
    document.cookie="refPage=coach.php";
    $("#topAnchor").hide();
    $("#footerSection").hide();
    $('body').css('padding-bottom', '70px');
});
const mos = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'

];
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


        function checkSub(){
            var sub = getCookie('kca');
            if (sub === 'not'){
                $("#loading").hide();
                $("#kcx").hide();
                $("#subscriptionDiv").show();
            }else {
                checkProfile(cid);
            }
        }



var wkStats = [];
var dStats = [];
var mStats = [];
var kcData = [];
var iniMs = [];
var userLogs = [];
// var json_str = getCookie('usr_d');
// var arr = JSON.parse(json_str);
// var cname = arr[0].cname;
// var cid = arr[0].cid;
var weekNum = 0;
var dayNum = 0;

$("#namex").text(cname);

var dayOfWeek = 1;
var actR = "";
var wFlag = 0;
var mFlag = 0;
var calFlag = true;
var stepFlag = true;
var protFlag = true;

checkSub();




function getTimeZone(){
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    
    // Timezone difference in minutes such as 330 or -360 or 0
    return timezone_offset_minutes; 
}

function weekEval(cid){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/coach.php',
       
        crossDomain: true,
        data: {'action': 'getEval', 'cid': cid},
        dataType: 'json',
        success: function(data) {
            console.log(data);
            

            let calT = data.cVal[0].calBase * 7;
            let calR = data.cVal[0].calTotal;
            $("#calTarget").text(calT);

            $("#calResult").text(calR);
            let cRes = data.cVal[0].calResult;
           let calFb = calFeedback(cRes);
            
            let stepT = data.sVal[0].stepBase * 7;
            let stepR = data.sVal[0].stepTotal
            $("#stepTarget").text(stepT);
            $("#stepResult").text(stepR);
            let sres = data.sVal[0].stepRes;
           let stepFb = stepFeedback(sres);

           let protT = data.pVal[0].protBase;
           let protR = data.pVal[0].protDays;
            $("#protTarget").text(data.pVal[0].protBase);
            $("#protResult").text(data.pVal[0].protDays);
            let pdays = data.pVal[0].protDays;
            let protFb = protFeedback(pdays);
            let inchx = 0;
            let msres = data.mVal[0].msResult;
            if (msres != 0) {
                inchx = data.mVal[0].msBase - data.mVal[0].msResult;
            } 
        
            $("#inchResult").text(inchx);
            $("#totalInch").text(inchx);
           let inchFb = inchFeedback(inchx);

           
            let wx = data.wVal[0].weightResult.toFixed(2);
            $("#weightResult").text(wx);
            $("#totalPounds").text(wx);
           let weightFb =  weightFeedback(wx);
           let kk = submitWeekResult(cid);
           if (kk === 1){
               $("#newCal").text(data.cVal[0].calBase + " cal");
               $("#newStep").text(data.sVal[0].stepBase+" steps");
               $("#newProt").text(data.pVal[0].protBase+" g");
            }
            
            if (kk === 2){
                $("#newCal").text(data.cVal[0].calBase - 150 + " cal");
                $("#newStep").text(data.sVal[0].stepBase + 2000 +" steps");
                $("#newProt").text(data.pVal[0].protBase +" g");
            }
            submitFeedbacks(cid, calT,calR, calFb, stepT, stepR, stepFb, protT, protR, protFb,inchx,inchFb, wx, weightFb, actR);
            setTimeout(function() {
                $("#barLoad").hide();
                document.getElementById("colors").style.display = "block";
                $("#fbSummary").fadeIn("fast");
              }, 3000);
        
        }
    }); //ajax
}

function submitFeedbacks(cid, calT,calR, calFb, stepT, stepR, stepFb, protT, protR, protFb,inchx,inchFb, wx, weightFb, actR){
    var userDate = getUserDate();
    var dd = {'action': 'postWfb', 'cid': cid, 'userDate': userDate,'calT': calT, 'calR': calR, 'calFb': calFb,'stepT': stepT, 'stepR': stepR, 'stepFb': stepFb, 'protT':protT, 'protR':protR, 'protFb':protFb, 'inch':inchx,'inchFb':inchFb,'weight':wx, 'weightFb':weightFb, 'actR': actR};
    $.ajax({ //post weekly feedbacks and details
        type: 'POST',
        url: 'https://kaisercoach.com/api/coach.php',
    
        crossDomain: true,
        data: dd,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            console.log("Feedbacks Recorded!");
        }
    }); //ajax
}

function submitWeekResult(cid){
    var stat = 1; //default status result
    var resultMsg = "Keep everything the same";
    if (wFlag === 0 && mFlag === 0){ //lost weight and inches
        console.log("lost weight and inches");
       
    }

    if (wFlag === 1 && mFlag === 1){ //weight and inches stayed the same
        if (calFlag === true && stepFlag === true && protFlag === true){
            stat = 2;
            console.log("No inches lost- No weight lost + Customer hit ALL of their targets");
            resultMsg = "Decrease 150 calories, add 2000 steps";
        }


        if (calFlag === false || stepFlag === false || protFlag === false){
         
            console.log("Repeat the same targets but encourage customer to hit them ");
        }
       
    }

    if (wFlag === 2 && mFlag === 2){ //lost weight and inches
        console.log("gained weight and inches");
        resultMsg = "Decrease 150 calories, add 2000 steps";
        stat = 2;
    }

$("#adjustmentsFeedback").text(resultMsg);
            $.ajax({ //post result
                type: 'POST',
                url: 'https://kaisercoach.com/api/coach.php',
            
                crossDomain: true,
                data: {'action': 'postRes', 'cid': cid, 'stat': stat},
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    console.log("result Posted!");
                }
            }); //ajax
actR = resultMsg;
return stat;

}
function weightFeedback(wx){
    var wfb = "";
    if (wx > 0){
        $("#weightFeedback").css('color', '#0F52BA');
        wfb = 'Amazing work '+ cname +'! We lost weight ';
        $("#weightFeedback").text(wfb);
    }

    if (wx === 0){
        wFlag = 1;
        $("#weightFeedback").css('color', '#000');
        wfb = 'Our weight stayed the same. Weight is NOT an accurate reflection of progress many times as you can be gaining muscle, have fluctuations, be holding onto more water than usual or many other reasons.';
        $("#weightFeedback").text(wfb);
    }

    if (wx < 0){ // gained weight
        wFlag = 2;
        $("#wc").text(" (Gained Weight)");
        $("#weightFeedback").css('color', '#000');
        wfb = 'Weight has gone up. Please don’t panic '+ cname +'. This is normal. I will factor this into our coaching adjustment.';
        $("#weightFeedback").text(wfb);
    }

    return wfb;
}
function inchFeedback(inchx){
    var ifb = "";
    if (inchx > 0){
        $("#inchFeedback").css('color', '#0F52BA');
        ifb = 'Terrific non scale victory '+ cname +'! Let’s keep momentum going!!';
        $("#inchFeedback").text(ifb);
 
    }

    if (inchx === 0){
        mFlag = 1;
        $("#inchFeedback").css('color', '#000');
        ifb = 'Our measurements stayed the same this week. This is a totally normal '+ cname +'. This can be due to hormones, sodium intake and many other factors.';
        $("#inchFeedback").text(ifb);
 
    }

    if (inchx < 0){ //gained
        mFlag = 2;
        $("#inchFeedback").css('color', '#000');
        ifb = 'Our measurements have increased. This is totally normal. We will factor this into our coaching adjustments.';
        $("#inchFeedback").text(ifb);
 
    }
    return ifb;
}
function protFeedback(pdays) {
    var pfb = "";
    if (pdays <= 2) {
        protFlag = false;
        $("#protFeedback").css('color', '#000');
        pfb = 'We did not hit our protein targets this week. Please look in the Bonus section for recipes and meal plans to help with this.';
        $("#protFeedback").text(pfb);
 
    } else {
        $("#protFeedback").css('color', '#0F52BA');
        pfb = 'Incredible work! We hit our targets this week! Let’s keep up the great work.';
        $("#protFeedback").text(pfb);
   
    }
    return pfb;
}
function stepFeedback(sres){
    var sfb = "";
    if (sres >= 1000){
        stepFlag =false;
        $("#stepResult").css('color', 'red');
        $("#stepFeedback").css('color', '#000');
        sfb = 'We did not get enough activity this week '+ cname +'. We can do better this coming week! Try to walk 10 minutes or so after eating to get those steps in. You can do this '+ cname +'!! ';
        $("#stepFeedback").text(sfb);
  
    } else {
        $("#stepResult").css('color', '#0F52BA');
        $("#stepFeedback").css('color', '#0F52BA');
        sfb = 'Fantastic job '+ cname +'! We hit our targets for this week. Proud of you! ';
        $("#stepFeedback").text(sfb);
    }
    return sfb;
}
function calFeedback(cRes){
    var cfb = "";
    if ( cRes >= -500 && cRes <= 0 ){
        $("#calResult").css('color', '#0F52BA');
        $("#calFeedback").css('color', '#0F52BA');
        cfb = 'You did a fantastic job '+ cname +'! Keep up the amazing work. This was a great week.';
        $("#calFeedback").text(cfb);
    } else {
        $("#calResult").css('color', 'red');
        $("#calFeedback").css('color', '#000');
       
    }

    if (cRes < -500){
        calFlag = false;
        cfb = 'We went over our calories this week. Please go through the recipe sections for delicious recipes that keep you full! You can do this '+ cname +'! ';
        $("#calFeedback").text(cfb);
    } 

    if (cRes > 0 && cRes <= 2000){
        cfb = 'You did a great job '+ cname +'! You are slightly under-eating though. Try to get as close as you can to your calorie goals. Please go through the recipe sections for delicious recipes that keep you full! You can do this '+ cname +'!';
        $("#calFeedback").text(cfb);
    } 

    if (cRes > 2000){
        calFlag = false;
        cfb = 'You did a great job '+ cname +'! You are slightly under-eating though. Try to get as close as you can to your calorie goals. Please go through the recipe sections for delicious recipes that keep you full! You can do this '+ cname +'!';
        $("#calFeedback").text(cfb);
    } 

    return cfb;
}


function checkProg(cid, dow){
    var userDate = getUserDate();
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/coach.php',
       
        crossDomain: true,
        data: {'action': 'dayProg', 'cid': cid, 'userDate': userDate},
        dataType: 'json',
        success: function(data) {
            if (data.message && dow === 7){
               
                $(".fb-con").show();
                // checkProfile(cid);
            } else {
               console.log("ongoing");
            //    checkProfile(cid);
            }
        }
    }); //ajax
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

document.getElementById("topMsg").textContent = cname;
document.getElementById("uname").textContent = cname;
function checkProfile(cid){
    var userDate = getUserDate();
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/coach.php',
       
        crossDomain: true,
        data: {'action': 'check', 'cid': cid, 'userDate': userDate},
        dataType: 'json',
        success: function(data) {
            console.log(data);
            let dow = data.dayOfWeek;
            dayOfWeek = data.dayOfWeek;
            checkProg(cid, dow);
             dStats = data.dailyStat;
             userLogs = data.myLogs;
        //    console.log(dStats);
             var curW = data.weightLost;
             wkStats = data.wfb;
           kcData = data.kcData;
           mStats = data.msStat;
           iniMs = data.initalMs;
           if (wkStats != null){ //there is a weekly feedback record
          
            $.each( wkStats, function( key, value ) {
                $("#weekSelector").append('<option value='+value.weekno+'>Week No. '+ value.weekno +'</option>');
                $("#weekSelectorx").append('<option value='+value.weekno+'>Week No. '+ value.weekno +'</option>');
            });
        } 
        //    console.log(kcData.length);
           if (kcData.length === undefined || kcData.length === 0){
            $("#loading").hide();

            $("#formContainer").fadeIn();

           } else {
            $("#loading").hide();
            $("#stepGoal").text(data.wLoss.stepProg);
            $("#calGoal").text(data.wLoss.calProg);
            $("#weekno").text(kcData[0].weekNo);
            $("#dnx").text(dayOfWeek);
            $("#dyno").text(data.wLoss.dayProg);
            dayNum = data.wLoss.dayProg;
            weekNum = parseInt(kcData[0].weekNo);
            $("#totalPounds").text(data.weightLost.toFixed(2));
            $("#totalInch").text(data.inchLost);
            if (weekNum > 1){
                $("#colors").show();
            }

            logPop();
            // $("#msWeek").text(kcData[0].weekNo);
            // $("#msDay").text(data.wLoss.dayProg);
            $("#weightDiff").text(curW);
            // $("#totalPounds").text(curW);
            $("#dsg").text(kcData[0].dailySteps);
            $("#dcg").text(kcData[0].calorie);
            $("#dpg").text(kcData[0].protein);
            $("#protGoal").text(data.wLoss.protProg);
            $("#iniBelly").text(iniMs[0].belly);
            $("#iniChest").text(iniMs[0].chest);
            $("#iniArms").text(iniMs[0].arms);
            $("#iniThighs").text(iniMs[0].thighs);
            $("#iniButt").text(iniMs[0].butt);
            $("#iniWeight").text(kcData[0].weight);
            $("#iniHeight").text(kcData[0].height);
            $("#iniAct").text(kcData[0].activityLevel);
            $("#iniSteps").text(kcData[0].dailySteps);
            

            var g = parseInt(iniMs[0].belly);
            var h = parseInt(iniMs[0].chest);
            var i = parseInt(iniMs[0].arms);
            var j = parseInt(iniMs[0].thighs);
            var k = parseInt(iniMs[0].butt);
            if (mStats != undefined && mStats != 0){
                
                $("#upBelly").text(mStats[0].belly);
                $("#upChest").text(mStats[0].chest);
                $("#upArms").text(mStats[0].arms);
                $("#upThighs").text(mStats[0].thighs);
                $("#upButt").text(mStats[0].butt);

                var a = parseInt(mStats[0].belly);
                var b = parseInt(mStats[0].chest);
                var c = parseInt(mStats[0].arms);
                var d = parseInt(mStats[0].thighs);
                var f = parseInt(mStats[0].butt);

                var aa = g - a;
                var bb = h - b;
                var cc = i - c;
                var dd = j - d;
                var ee = k - f;

                var x = aa+bb+cc+dd+ee;

                // $("#totalInch").text(x);
                $("#til").text(x);
                 } else {
                    $("#totalInch").text("0.00"); 
                 }
            if(dStats){

           
                 $.each( dStats, function( key, value ) {
                    let dn = parseInt(value.dayno);
                    let ts = parseInt(value.target_status);
                    if (dn === 1){
                        if (ts === 1){
                            $("#d1s").removeClass("glyphicon-remove");
                            $("#d1s").addClass("glyphicon-ok");
                            $("#d1s").css('color', 'green');
                        } else {
                            $(".first").show();
                        }
                       
                    } 
                    if (dn === 2){
                        if (ts === 1){
                            $("#d2s").removeClass("glyphicon-remove");
                            $("#d2s").addClass("glyphicon-ok");
                            $("#d2s").css('color', 'green');
                        } else {
                            $(".second").show();
                        }
                    }
                    if (dn === 3){
                        if (ts === 1){
                            $("#d3s").removeClass("glyphicon-remove");
                            $("#d3s").addClass("glyphicon-ok");
                            $("#d3s").css('color', 'green');
                        } else {
                            $(".third").show();
                        }
                    }
                    if (dn === 4){
                        if (ts === 1){
                            $("#d4s").removeClass("glyphicon-remove");
                            $("#d4s").addClass("glyphicon-ok");
                            $("#d4s").css('color', 'green');
                        } else {
                            $(".fourth").show();
                        }
                    }
                    if (dn === 5){
                        if (ts === 1){
                            $("#d5s").removeClass("glyphicon-remove");
                            $("#d5s").addClass("glyphicon-ok");
                            $("#d5s").css('color', 'green');
                        } else {
                            $(".fifth").show();
                        }
                    }
                    if (dn === 6){
                        if (ts === 1){
                            $("#d6s").removeClass("glyphicon-remove");
                            $("#d6s").addClass("glyphicon-ok");
                            $("#d6s").css('color', 'green');
                        } else {
                            $(".sixth").show();
                        }
                    }
                    if (dn === 7){
                        if (ts === 1){
                            $("#d7s").removeClass("glyphicon-remove");
                            $("#d7s").addClass("glyphicon-ok");
                            $("#d7s").css('color', 'green');
                        } else {
                            $(".seventh").show();
                        }
                    }
                 });
                }
                //  var htmlPage = dStats.find(x => x.dayno === "3").calorie;
                //  console.log(htmlPage.length);
            $("#coaching").fadeIn();
            checkLogs();
            //    console.log("Welcome Back");
           }
           
        },
        error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {

            console.log(xhr);
        }

        }); //end AJAX
        
}

$(".activity").click(function(){
    $(".activity").removeClass("clicked");
    $(this).addClass("clicked");
   var val = $(this).data("val");
   document.getElementById("activityLevel").value = val;
  
});

function checkLogs(){ //disable the Log buttons in respect to current day of user's week
    var x = document.getElementsByClassName("logButton");
    for (let i = 0; i < x.length; i++) {
        if (i >= dayOfWeek){
            x[i].disabled = true;
        }
      } 
    
}

function refreshh(){
   
   
    window.location.href = "/stage/kaiserfit.php";
  
    

   }
function submitForm(){
    $("#formContainer").hide();
    $("#loading").show();
    $("#compute").show();
    var form = $("#step1").serialize();
    var calorie = $("#weight").val() * $("#activityLevel").val();
    var userDate = getUserDate();
    var timezone = getTimeZone();
    form += "&cid="+cid;
    form += "&calorie="+calorie;
    form += "&userDate="+userDate;
    form += "&tz="+timezone;
    form += "&action=submitInitialStats";
    console.log(form);
    // return false;
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/coach.php',
       
        crossDomain: true,
        data: form,
        dataType: 'json',
        success: function(data) {
          
            $("#compute").hide();
            $("#loading").hide();
            window.location.href = "/stage/kaiserfit.php";
            refreshh();
            // $("#rci").text(calorie + " cal");
            // $("#resultDiv").fadeIn();


            // setTimeout(function() {
            //     $("#loading").show();
            //     $("#resultDiv").hide();
            //     $("#coaching").show();
            //   }, 1000);

          console.log(data);
        },
        error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {

            console.log(xhr);
        }

        }); //end AJAX
}
function checkform() {
    var weight = $("#weight").val();
    var act = $("#activityLevel").val();
    var step = $("#iStep").val();
    var res = 0;
    var belly = $("#belly").val();
    var chest = $("#chest").val();
    var arms = $("#arms").val();
    var thighs = $("#thighs").val();
    var butt = $("#butt").val();
    if (isNaN(belly) || isNaN(chest) || isNaN(arms) || isNaN(thighs) || isNaN(butt)){
        $("#measureErrorx").show();
        document.getElementById('measureErrorx').scrollIntoView();

        res = 1;
    }

    if (belly === "" || chest === "" || arms === "" || thighs === "" || butt === ""){
        $("#measureErrorx").show();
        document.getElementById('measureErrorx').scrollIntoView();

        res = 1;
    }
    if (weight === "" || isNaN(weight)){
        $("#errorWeight").show();
        document.getElementById('errorWeight').scrollIntoView();

        res = 1;
    } 

    if (isNaN(step)){
        $("#errorWeight").show();
        document.getElementById('errorWeight').scrollIntoView();

        res = 1;
    }
    if (step === ""){
        $("#iStep").val(5000);
    }

    if (act === "0"){
        $("#errorAct").show();
        document.getElementById('errorAct').scrollIntoView();
        res = 1;
    } 

 
   
   if (res === 1){
    return false;
   } else {
       return true;
   }
    

}
$("#btnStats").click(function(){
    $(".form-errors").hide();
    if (checkform()){
        submitForm();
    } 
    
});


function submitProt(prot){
    var prid = kcData[0].recordId;

}

$("#statButton1").click(function(){
    
    $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
    $("#statError").hide();
   var prid = kcData[0].recordId;
   
   
   var userDate = getUserDate();
    var cal = $("#cal").val();
    var wght = $("#wght").val();
    var step = $("#stepz").val();
    var prot = $("#protein").val();
    let dayno = $("#dayno").val();
    if (cal === "" || isNaN(cal) || wght === "" || isNaN(wght) || step === "" || isNaN(step) || prot === "" || isNaN(prot)){
        $("#statError").show();
        $(this).html("Submit Data");
        return false;
    } else {
        
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/coach.php',
           
            crossDomain: true,
            data: {'action': 'submitDailyStat1','prid': prid,'userDate': userDate,'dayno': dayno, 'cid': cid, 'cal': cal, 'wght': wght, 'step': step, 'prot': prot},
            dataType: 'json',
            success: function(data) {
                // $(".kc-con").hide();
                // $('#modStat').modal('hide');
                // location.reload();
                console.log(data);
                
                // setTimeout(function() {
                //     $("#loading").show();
                //     $("#resultDiv").hide();
                //     $("#coaching").show();
                //   }, 1000);
                $("#btnHolderStat1").hide();
                switch(data.fb){
                    case "xcal":
                        document.getElementById("feedbackCon").innerHTML = "<h4>You did Good today "+ cname +". Tomorrow we can do even better by hitting BOTH our calorie and step goals!</h4>";
                    break;
                    case "xstep":
                        document.getElementById("feedbackCon").innerHTML = "<h4>You did Good today "+ cname +". Tomorrow we can do even better by hitting BOTH our calorie and step goals!</h4>";
                        break;
                    case "xx":
                        document.getElementById("feedbackCon").innerHTML = "<h4>That's okay "+ cname +". There is always tomorrow!. Let's try to hit our numbers moving forward.</h4>";
                        break;
                    case "gg":
                        document.getElementById("feedbackCon").innerHTML = "<h4>Great job "+ cname +"! Please repeat exactly what you did today again!</h4>";
                    //    let ss = "d"+dayno+"s";
                    //    document.getElementById(ss).removeClass("glyphicon-remove");
                    //    document.getElementById(ss).addClass("glyphicon-ok");
                    //    document.getElementById(ss).style.color = "green";

                    //    console.log(ss);
                        break;
                    default:
                        break;
                }
                $("#formGot").show();
                
            },
            error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {
    
                console.log(xhr);
            }
    
            }); //end AJAX
    }
    
    $(this).html("Submit Stats");

    
});
$("#formGot").click(function(){
    // window.location.href = "/stage/kaiserfit.php";
    // refreshh();
});
$("#basicButton").click(function(){
    $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
    $("#bstatError").hide();
    var form = $("#bStat").serialize();
    var prid = kcData[0].recordId;
    form += "&prid="+prid;
    form += "&cid="+cid;
    form += "&action=updatebasicdata";
    console.log(form);
    let weight = $("#msWeight").val();
    let steps = $("#msSteps").val();
    if (weight === "" || isNaN(weight) || steps === "" || isNaN(steps)) {
        $("#bstatError").show();
        $(this).html("Update Basic Data");
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/coach.php',
           
            crossDomain: true,
            data: form,
            dataType: 'json',
            success: function(data) {
                // $(".kc-con").hide();
                // $('#modStat').modal('hide');
                window.location.href = "/stage/kaiserfit.php";
                refreshh();
                console.log(data);
                
                // setTimeout(function() {
                //     $("#loading").show();
                //     $("#resultDiv").hide();
                //     $("#coaching").show();
                //   }, 1000);
    
             
            },
            error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {
    
                console.log(xhr);
            }
    
            }); //end AJAX
    }
  
});
$("#mxButton").click(function(){
    
    $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
    $("#mxtatError").hide();
   var prid = kcData[0].recordId;
   
   
   var userDate = getUserDate();
    let belly = $("#mxBelly").val();
    let chest = $("#mxChest").val();
    let arms = $("#mxArms").val();
    let thighs = $("#mxThighs").val();
    let butt = $("#mxButt").val();
   
    
    if (belly === "" || isNaN(belly) || chest === "" || isNaN(chest) || arms === "" || isNaN(arms) || thighs === "" || isNaN(thighs) || butt === "" || isNaN(butt)){
        $("#mxtatError").show();
        $(this).html("Submit Measurements");
        return false;
    } else {
        
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/coach.php',
           
            crossDomain: true,
            data: {'action': 'updateMs','prid': prid,'userDate': userDate, 'cid': cid, 'dayno': dayNum, 'belly': belly, 'chest': chest, 'arms': arms, 'thighs':thighs,'butt': butt},
            dataType: 'json',
            success: function(data) {
                // $(".kc-con").hide();
                // $('#modStat').modal('hide');
                
                console.log(data);
                $('#mxButton').prop('disabled', false);
                $("#weighIn").hide();
                $("#cCon").show();

                weekEval(cid);
                // setTimeout(function() {
                //     $("#loading").show();
                //     $("#resultDiv").hide();
                //     $("#coaching").show();
                //   }, 1000);
    
             
            },
            error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {
    
                console.log(xhr);
            }
    
            }); //end AJAX
    }

   

    
});
$("#measureButton").click(function(){
    
    $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div>");
    $("#mstatError").hide();
   var prid = kcData[0].recordId;
   
   
   var userDate = getUserDate();
    let belly = $("#msBelly").val();
    let chest = $("#msChest").val();
    let arms = $("#msArms").val();
    let thighs = $("#msThighs").val();
    let butt = $("#msButt").val();
   
    
    if (belly === "" || isNaN(belly) || chest === "" || isNaN(chest) || arms === "" || isNaN(arms) || thighs === "" || isNaN(thighs) || butt === "" || isNaN(butt)){
        $("#mstatError").show();
        $(this).html("Submit Measurements");
        return false;
    } else {
        
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/coach.php',
           
            crossDomain: true,
            data: {'action': 'updateMs','prid': prid,'userDate': userDate, 'cid': cid, 'dayno': dayNum, 'belly': belly, 'chest': chest, 'arms': arms, 'thighs':thighs,'butt': butt},
            dataType: 'json',
            success: function(data) {
                // $(".kc-con").hide();
                // $('#modStat').modal('hide');
                window.location.href = "/stage/kaiserfit.php";
                refreshh();
                console.log(data);
                
                // setTimeout(function() {
                //     $("#loading").show();
                //     $("#resultDiv").hide();
                //     $("#coaching").show();
                //   }, 1000);
    
             
            },
            error: function(data, xhr,jqXHR, ajaxOptions, thrownError) {
    
                console.log(xhr);
            }
    
            }); //end AJAX
    }

    $(this).html("Updated Measurements");

    
});



function logPop(){
  
    if (weekNum > 0){
        for (let i = 0; i < weekNum; i++) {
            $("#log-week-selector").append('<option value='+ (i+1) +'>Week No. '+ (i+1) +'</option>');
          } 
           
            

       
    }
  
}

$(".coach-tab").click(function(){
    $(".pageTab").hide();
    $(".vis").hide();
    $(".kc-tab").removeClass(" active");
    $(this).addClass("active");

    var page = $(this).data("page");
    showMs();
//    document.getElementById(page).style.display = "block";
});

$(".kc-tab").click(function(){

    $(".kc-tab").removeClass(" active");
    $(this).addClass("active");


});




$(".shop-tab").click(function(){
    $(".pageTab").hide();
    $(".vis").hide();
    $(".kc-tab").removeClass(" active");
    $(this).addClass("active");

  $("#shopDiv").load("supplements-2.html");
//   $("#shopDiv").show();
  $("#weeklyCoaching").animate({
    left: '-200px',
    opacity: 'hide'

}, "fast");
$("#shopDiv").addClass(" vis");
$("#shopDiv").animate({
     right: '0px',
    opacity: 'show'

}, "fast");
//    document.getElementById(page).style.display = "block";
});

function backToCoach(){
    $(".kc-tab").removeClass(" active");
    $(".vis").animate({
        right: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $("#weeklyCoaching").animate({
         left: '0px',
        opacity: 'show'
    
    }, "fast");
}
function showMs(){
    $("#fbSection").hide();
    if (mStats.length === 0){
        //populate with default data
        $("#msBelly").val(kcData[0].belly);
        $("#msChest").val(kcData[0].chest);
        $("#msArms").val(kcData[0].arms);
        $("#msThighs").val(kcData[0].thighs);
        $("#msButt").val(kcData[0].butt);
    } else {
        // populate the form with M
        $("#msBelly").val(mStats[0].belly);
        $("#msChest").val(mStats[0].chest);
        $("#msArms").val(mStats[0].arms);
        $("#msThighs").val(mStats[0].thighs);
        $("#msButt").val(mStats[0].butt);
    }
    $("#msWeight").val(kcData[0].weight);
    var hh = parseInt(kcData[0].height);
  
    $("#msHeight").val(hh);
    $("#msRange").val(hh);
   console.log(wkStats);
    
    var outputFtx = document.getElementById("ftsVal");
    var outputInchx = document.getElementById("inchsVal");
    var inche = hh%12;
    var feete = Math.floor(hh / 12);
      outputInchx.innerHTML = inche;
      outputFtx.innerHTML = feete;
    $("#msAct").val(kcData[0].activityLevel);
    $("#msSteps").val(kcData[0].dailySteps);
   
    
    $("#weeklyCoaching").animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $("#mStat").addClass(" vis");
    $("#mStat").animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");
}
$("#hideSum").click(function(){
    $("#weekSelector").val("0");
    $("#fbSection").slideUp();
});
$("#hideSumx").click(function(){
    $("#weekSelectorx").val("0");
    $("#fbxSection").slideUp();
});

$("#hideLogs").click(function(){
    $("#log-week-selector").val("0");
    $("#logSection").slideUp();
});
$("#weekSelector").on('change', function(){
    $("#fbSection").hide();
    var g = this.value;
   
    $.each( wkStats, function( key, value ) {
      var rr = value.weekno;

      if(rr === g){
        $("#calT").text(value.cal_target);
        $("#calR").text(value.cal_result);
        $("#calF").text(value.cal_fb);
        $("#stepT").text(value.step_target);
        $("#stepR").text(value.step_result);
        $("#stepF").text(value.step_fb);
        $("#protT").text(value.prot_target);
        $("#protR").text(value.prot_result);
        $("#protF").text(value.prot_fb);
        $("#inchR").text(value.inch_lost);
        $("#inchF").text(value.inch_fb);
        $("#weightR").text(value.weight_lost);
        $("#weightF").text(value.weight_fb);
        $("#actR").text(value.result_action);
      }
    });
   $("#fbSection").show();
});


$("#weekSelectorx").on('change', function(){
    $("#fbxSection").hide();
    var g = this.value;
   
    $.each( wkStats, function( key, value ) {
      var rr = value.weekno;

      if(rr === g){
        $("#calTx").text(value.cal_target);
        $("#calRx").text(value.cal_result);
        $("#calFx").text(value.cal_fb);
        $("#stepTx").text(value.step_target);
        $("#stepRx").text(value.step_result);
        $("#stepFx").text(value.step_fb);
        $("#protTx").text(value.prot_target);
        $("#protRx").text(value.prot_result);
        $("#protFx").text(value.prot_fb);
        $("#inchRx").text(value.inch_lost);
        $("#inchFx").text(value.inch_fb);
        $("#weightRx").text(value.weight_lost);
        $("#weightFx").text(value.weight_fb);
        $("#actRx").text(value.result_action);
      }
    });
   $("#fbxSection").show();
});

$("#log-week-selector").on('change', function(){
    $("#logSection").hide();
    var g = this.value;
    $('#log-week').text(g);
    $('#log-body').html('');
    var weekLog = [];
    $.each( userLogs, function( key, value ) {
      var rr = value.weekno;
      
      if(rr === g){
        weekLog.push(userLogs[key]) ;
        }

      
    });

    function compare( a, b ) {
        if ( a.dayno < b.dayno ){
          return -1;
        }
        if ( a.dayno > b.dayno ){
          return 1;
        }
        return 0;
      }
      
      weekLog.sort( compare );

    for (let i = 0; i <weekLog.length; i++){
        let datelog = new Date(weekLog[i].date_created);
        let colorcal = (parseInt(weekLog[i].calorie) <= parseInt(weekLog[i].calGoal)) ? 'text-success' :'text-danger';
        let colorstep = (parseInt(weekLog[i].steps) >= parseInt(weekLog[i].stepGoal)) ? 'text-success' :'text-danger';
        
        $('#log-body').append('<tr>'+
        '<td>'+ weekLog[i].dayno +'</td>'+
        '<td>'+ weekLog[i].weight +'</td>'+
        '<td class="'+ colorcal +'">'+ weekLog[i].calorie +'</td>'+
        '<td class="'+ colorstep +'">'+ weekLog[i].steps +'</td>'+
        '<td>'+ weekLog[i].protein +'</td>'+
        '<td>'+ mos[datelog.getMonth()]+ ' ' + datelog.getDate() +', '+ datelog.getFullYear() +'</td>'+     
        '</tr>');
    }
    // $.each( weekLog, function( key, value ) {
       
    // });
  
   $("#logSection").show();
});


function toFeedBack(){
    $("#weeklyCoaching").animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $("#coachingFb").addClass(" vis");
    $("#coachingFb").animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");
}
$(".btnFeedback").click(function() {
    toFeedBack();
    // weekEval(cid);
   
});
$(".logButton").click(function(){
    $("#basicStat").trigger("reset");
    var day = $(this).data("day");
    $("#dayno").val(day);
    var idx = day - 1;
    // console.log(jQuery.type(day));
    if (dStats[idx]){
        
        var g = day.toString();
        let ww = dStats.find(x => x.dayno === g).weight;
        let wc = dStats.find(x => x.dayno === g).calorie;
        let ws = dStats.find(x => x.dayno === g).steps;
        let wp = dStats.find(x => x.dayno === g).protein;

        $("#wght").val(ww);
        $("#cal").val(wc);
        $("#stepz").val(ws);
        $("#protein").val(wp);
    } else {
        console.log("index doesn't exist");
    }
    //    var htmlPage = dStats.find(x => x.dayno === "7").calorie;
    //               console.log(htmlPage.length);
    document.getElementById("dno").textContent = day;
    $("#weeklyCoaching").animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $("#logCon").addClass(" vis");
    $("#logCon").animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");
});
$("#formBack").click(function(){
    // $("#logCon").animate({
    //     right: '-200px',
    //     opacity: 'hide'
    
    // }, "fast");
    // $("#weeklyCoaching").animate({
    //      left: '0px',
    //     opacity: 'show'
    
    // }, "fast");

    backToCoach();
});

$("#fBack").click(function(){
    // $("#logCon").animate({
    //     right: '-200px',
    //     opacity: 'hide'
    
    // }, "fast");
    // $("#weeklyCoaching").animate({
    //      left: '0px',
    //     opacity: 'show'
    
    // }, "fast");

    backToCoach();
});
$("#mBack").click(function(){
    backToCoach();
    // $("#mStat").animate({
    //     right: '-200px',
    //     opacity: 'hide'
    
    // }, "fast");
    // $("#weeklyCoaching").animate({
    //      left: '0px',
    //     opacity: 'show'
    
    // }, "fast");
});

$("#feedBack").click(function(){
    backToCoach();
   
});

/* FROM KAISERFIT.JS */

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
          window.location.href = "/stage/members.php#kaisercoach";
          document.cookie="refPage=coach.php";
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