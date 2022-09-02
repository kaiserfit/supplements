
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


        var ccc = getCookie('cartCount');
        $("#cartCountx").text(ccc);
document.cookie="refPage=user-account.html";
var myOrders = [];

$("#footerSection").hide();


$("#Username").text(cname);
$("#Email").text(customerEmail);
$("#Phone-number").text(customerPhone);
$("#My-address").html(customerAddress + ', ' + customerTown + '<br>'+ customerState + ', ' + customerCountry + ' '+customerZip);
popAddressModal();
getOrders();





$('.user-details').click(function(){
    $("#update-modal-form input").remove();
    var text = $(this).closest("span + *").prev();
    // console.log(text.attr('id'));
    var txt = text.attr('id').replace(/\-/g, ' ');
    var inputName = 'value-'+text.attr('id');
    
    $("#toChange").text(txt);
    $("#update-modal-form").append('<input type="text" class="form-control" name="'+ inputName +'" id="'+ inputName +'"/>');
    $('#update-modal-button').attr('data-detail', text.attr('id'));
    $('#'+inputName).val(text.text());
});

function popAddressModal(){
    $("#userStreet").val(customerAddress);
    $("#userTown").val(customerTown);
    $("#userState").val(customerState);
    $("#userZip").val(customerZip);
    // $("#userCountry").val(customerCountry);

    $("#userCountry").val(customerCountry);
    // $("#userCountry").filter(function() {
       
    //     return $(this).value === customerCountry;
    //   }).prop('selected', true);
}

$('#update-modal-button').click(function(){
    $(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div>');
    var form = $("#update-modal-form input").serializeArray();
    var detail = $(this).data('detail');

    switch (detail){
        case "Username":
            updateUserName(form[0].value);
        break;
        case "Email":
            updateUserEmail(form[0].value);
        break;
        case "Phone-number":
            updateUserPhone(form[0].value);
        break;
         default:
            break;
    }
   
});

$('#address-modal-form input').blur(function()
{
    $(this).parents('.form-group').removeClass('has-error');
    if( !$(this).val() ) {
          $(this).parents('.form-group').addClass('has-error');
    }
});

function checkAddressInputs(){
    var errorcount = 0;
    $('#address-modal-form .form-group').each(function(i, obj) {
        if ($(this).hasClass('has-error')) {
            errorcount++;
        }
    });
    return errorcount;
}

$("#address-modal-button").click(function(){

    $(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div>');
    $("#address-error").addClass("hidden");
    var check = checkAddressInputs();
    if (check > 0) {
        $("#address-error").removeClass('hidden');
       
           $("#address-error").focus();
        
        $(this).html('Update Address');
        return false;
    } else {
        var form  = $("#address-modal-form").serialize();
        form += "&cmd=address";
        form += "&cid="+cid;
        
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/userUpdate.php',
            crossDomain: true,
            data: form,
            dataType: 'json',
            success: function(data) {
               
               var json_str = JSON.stringify(data.user);
               createCookie('usr_d', json_str);
               window.location.reload();
            }, error: function(data){
              console.log(data);
            }
      
          });


    }
});

function updateUserName(val){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/userUpdate.php',
        crossDomain: true,
        data: {'cmd': 'username','cid': cid, 'username': val},
        dataType: 'json',
        success: function(data) {
           
           var json_str = JSON.stringify(data.user);
           createCookie('usr_d', json_str);
           window.location.reload();
        }, error: function(data){
          console.log(data);
        }
  
      });
}

function updateUserEmail(val){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/userUpdate.php',
        crossDomain: true,
        data: {'cmd': 'email','cid': cid, 'email': val},
        dataType: 'json',
        success: function(data) {   
            var json_str = JSON.stringify(data.user);
            createCookie('usr_d', json_str);
            window.location.reload();
        
        }, error: function(data){
          console.log(data);
        }
  
      });
}

function updateUserPhone(val){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/userUpdate.php',
        crossDomain: true,
        data: {'cmd': 'phone','cid': cid, 'phone': val},
        dataType: 'json',
        success: function(data) {   
            var json_str = JSON.stringify(data.user);
            createCookie('usr_d', json_str);
            window.location.reload();
        
        }, error: function(data){
          console.log(data);
        }
  
      });
}



function getOrders(){
    $("#order-panel-main").html('<div class="lds-ripple"><div></div><div></div></div>');
    $.ajax({
        type: 'POST',
        url: 'https://pay.kaiserfitapp.com/api/customerOrders.php',
        crossDomain: true,
        data: {'cid': cid},
        dataType: 'json',
        success: function(data) {
            $("#order-panel-main").html('');
        //   console.log(data.order[0].order_items);
        myOrders = data.order;
        orderPop();
        }, error: function(data){
          console.log(data);
        }
  
      });
}
var monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
    
    
    ];
function formatDate(order_date){
    return monthName[order_date.getMonth()] + ' '+order_date.getDate() + ", " +  order_date.getFullYear()
}
function orderPop(){
    
    $.each(myOrders, function(key,value){
        
        var orderdate = new Date(value.order_date);
        $('#order-panel-main').append('<div class="panel panel-success">'+
        '<div class="panel-heading text-info">Order # '+ value.order_number +'</div>'+
        '<div class="panel-body">'+
      
        '<p class="list-group-item-text">Order Date: '+ formatDate(orderdate) +'</p>'+
        '<p class="list-group-item-text">Items: </p>'+
        '<table class="table table-striped">'+
        '<thead>'+
        '<tr>'+
        '<td>Product</td>'+
       
        '<td>Price</td>'+
       
        '<td>Quantity</td>'+
        '</tr>'+
        '</thead>'+
        '<tbody class="order-details">'+

        '</tbody>'+
        '</table>'+
        '</div>'+
        '</div>');


        $.each(value.order_items, function(i, val){
            
            $(".order-details:eq("+ key +")").append('<tr>'+
            '<td>'+
            val.product +
            '</td>'+
            '<td>'+
            parseInt(val.price).toFixed(2) +
            '</td>'+
            '<td>'+
            val.qty +
            '</td>'+
            '</tr>');

        });
    });


}