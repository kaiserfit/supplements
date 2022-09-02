$(document).ready(function(){
    $("#rating").val(0);
});
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random() * (max - min) + min);
}
function getComments(){
    $('#product-reviews').html('');
    var idx = $(".rev-page.active").index();
    
    $.each(commentsArray , function(key, value){
        if (value.page === idx){
            
          
           var x = new Date(value.created);
           let formattedDate = months[x.getMonth()] + ' '+x.getDate() +', ' + x.getFullYear();
            $('#product-reviews').append('<div class="rev-section">'+
            '<div class="rev-head">'+
            '<p class="rev-person-name pull-left"><strong>'+ value.fullname +      
            '</strong></p>'+
            
            '<p class="rev-date pull-right">'+ formattedDate  +'</p>'+
            '</div>'+
            '<p class="rev-title">'+ 
            '<img src="components/svg/stars.svg" alt="stars" height="18" width="18">'+
            '<img src="components/svg/stars.svg" alt="stars" height="18" width="18">'+
            '<img src="components/svg/stars.svg" alt="stars" height="18" width="18">'+
            '<img src="components/svg/stars.svg" alt="stars" height="18" width="18">'+
            '<img src="components/svg/stars.svg" alt="stars" height="18" width="18">'+
            '&nbsp;&nbsp;&nbsp;<strong>'+ value.title +'</strong></p>'+
            '<p class="rev-content">'+ value.content +'</p>'+
            '<div class="rev-vote">'+
            '<p><i>Was this review helpful?</i>&nbsp;&nbsp;'+  
            '<a href="javascript:void(0);" class=""><i class="fas fa-thumbs-up user-vote" aria-hidden="true"></i></a>&nbsp;<span class="like-count">'+ value.upvote_count +'</span> &nbsp;&nbsp;'+  
            '<a href="javascript:void(0);"  class=""><i class="fas fa-thumbs-down user-vote" ></i></a>&nbsp;<span class="dislike-count">0</span> </p>'+
            
            '</div>'+
            
            '</div><hr>');

        }
    });

    $(".user-vote").click(function(){
        var me = $(this);
        var userUpvoted = me.parent().parent().find('.fa-thumbs-up').hasClass('liked');
        if ($(this).hasClass('liked')){
            return false;
        }
       
        let up = me.hasClass('fa-thumbs-up');
        let r = me.parent().parent().find('.user-vote');
        r.removeClass('liked');
        me.addClass('liked');
        
        var uvc =  parseInt(me.parent().parent().find('.like-count').text());
        // var dvc =  parseInt(me.parent().parent().find('.dislike-count').text());
        if (up){ //user wants to upvote
            me.parent().parent().find('.dislike-count').text('0');
            me.parent().parent().find('.like-count').text((uvc + 1));
           
        } else {
            if (userUpvoted){
                me.parent().parent().find('.like-count').text((uvc - 1));
            }
            me.parent().parent().find('.dislike-count').text('1');
        }
     
        });

       

    }


$(".rev-page").click(function(){
   
    $(".rev-page").removeClass(' active');
    $(this).addClass('active');
    getComments();
    $('html, body').animate({
        scrollTop: $("#product-reviews").offset().top
    }, 1000);
});

$(".rev-arrows").click(function(){
    
   var nav = $(this).data('id');
   var idx = $(".rev-page.active").index();
  if (idx === 1 && nav === 'prev'){
    return false;
  }

  if (idx === 5 && nav === 'next'){
    return false;
  }
   var t = (nav == 'next') ? (idx + 1) : (idx - 1);
   
   $(".rev-page").removeClass(' active');
   $(".rev-page").eq(t-1).addClass('active');
   getComments();
   $('html, body').animate({
    scrollTop: $("#product-reviews").offset().top
}, 1000);
    // $(".rev-page").removeClass(' active');
    // $(this).addClass('active');

});

$('.rev-write').click(function(){
    $("#rev-form").toggle("swing");
});

$('.user-rev-rate').click(function(){
         $('.user-rev-rate').removeClass('fas fa-star');
        $('.user-rev-rate').addClass('far fa-star');
    var x = $(this).index();
    
    for (var i=0;i<=x;i++) {
        $('.user-rev-rate').eq(i).removeClass('far fa-star');
        $('.user-rev-rate').eq(i).addClass('fas fa-star');
    }
    let rating = x + 1;
    $("#rating").val(rating);
    
});

function isEmail(d) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(d);
  }

$("#post-review").click(function(event){
    event.preventDefault();
    $(".error-revs").hide();
    var valid = true;
    $('#rev-form input[type="text"]').each(function() {
        if ($(this).val() === "") { //check if text inputs are filled
         let g = $(this).prev().find('.error-revs');
            g.show();
           valid = false;
        }
     });

     
    var d = $("#user-rev-email").val();
    
    var r = $("#content").val();

    if (d === "" || !isEmail(d)){ //check if email is empty or valid
        $(".error-rev-email").show();
        valid = false;
    }

    if (r === ""){ //check if there's a review content
        $(".error-rev-content").show();
        valid = false;
    }

    if (valid){
        var form = $("#rev-form").serializeArray();
        

        $.ajax({
            type: 'POST',
            // url: 'https://kaisercoach.com/api/payment-test.php',
            url: 'https://kaisercoach.com/api/revPost.php',
            crossDomain: true,
            data: form,
            dataType: 'json',
            success: function(data){
                $(".rev-write").hide();
                $("#rev-form").toggle("swing");
                $("#rev-success").show();

            }
           

        });
    } else {
        return false;
    }
    
});


getComments();