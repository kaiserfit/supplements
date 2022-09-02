// var iframe = document.getElementById('vFrame');
// // $f == Froogaloop
// var player = $f(iframe);

$(".month-button").click(function(){
    var month = $(this).data("month");
    var divID = "#month"+month;
    $("#monthNum").text("Month " + month);
    $("#months").animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    
    $(divID).animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");
  });


  $(".month-cooking").click(function(){
   
    var month = $(this).data("month");
    var fromDiv = "#content"+month;
    var divID = "#cook"+month;
    console.log("fromdiv = "+ fromDiv);
    console.log("target = "+ divID);
    
    $(fromDiv).animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $(divID).addClass(" vis");
    $(divID).animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");

    $('html, body').scrollTop(220);
  });


  $(".month-workout").click(function(){
   
    var month = $(this).data("month");
    var fromDiv = "#content"+month;
    var divID = "#workOut"+month;
    console.log("fromdiv = "+ fromDiv);
    console.log("target = "+ divID);
    
    $(fromDiv).animate({
        left: '-200px',
        opacity: 'hide'
    
    }, "fast");
    $(divID).addClass(" vis");
    $(divID).animate({
         right: '0px',
        opacity: 'show'
    
    }, "fast");

    $('html, body').scrollTop(220);
  });

  $(".back-to-months").click(function(){
    
    $("#monthNum").text("");
    $(".monthly").animate({
        right: '-200px',
        opacity: 'hide'
    
    }, "fast");
    
    $("#months").animate({
         left: '0px',
        opacity: 'show'
    
    }, "fast");
  });

  $(".back-to-month-content").click(function(){
    
    var monthContent = $(this).data("month");
    console.log(monthContent);
    var fromDiv = $(this).data("div");
    var targetDiv = "#content"+monthContent;
    console.log("fromdiv = "+ fromDiv);
    console.log("target = "+ targetDiv);
    $(fromDiv).animate({
        right: '-200px',
        opacity: 'hide'
    
    }, "fast");
    
    $(targetDiv).animate({
         left: '0px',
        opacity: 'show'
    
    }, "fast");
  });

  $(".vid-cook").click(function(){
    var food = $(this).data("food");
   
   
    var link = $(this).data("url");
   
    var opt = {
      url: link,
      responsive: true
    }
   
    $("#food").text(food);
    $("#vimeoModal").modal('show');
   
    var player = new Vimeo.Player('vFrame', opt);
  
    player.setVolume(0);
    player.play();
    player.setVolume(.5);
    

  });

  $(".vid-workout").click(function(){
      
    var link = $(this).data("url");
  
    var opt = {
      url: link,
      responsive: true
    }
      
    $("#vimeoModal").modal('show');
    var iframe = document.getElementById("vFrame");
    var player = new Vimeo.Player('vFrame', opt);
    $("#food").text("");
    player.setVolume(0);
    player.play();
    player.setVolume(1);
  

  });


  $('#vimeoModal').on('hidden.bs.modal', function () {
       var iframe = document.getElementById("vFrame");
    var player = new Vimeo.Player(iframe);
    player.destroy().then(function() {
     console.log("video closed");
    });
    // $(this).find("iframe")[0].src += "";
    })