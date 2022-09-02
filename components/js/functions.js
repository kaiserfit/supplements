$(document).ready(function(){
//     fillCustomers();
// fillPayments();


});

var customers;
var payments;

function getAll(){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/curly.php',
        crossDomain: true,
        data: {'cmd': 'all'},
        dataType: 'json',
        success: function(data) {
            //   console.log(data);
            customers = data.customers;
            payments = data.payments;
            console.log(customers);
            $("#homeP").fadeIn("slow");
        }, error: function(data){

            console.log(data);
        }
    });
}
getAll();
function refund(id){

    if (confirm('Are you sure you want to refund this Payment?')){
        $.ajax({
            type: 'POST',
            url: 'https://kaisercoach.com/api/curly.php',
            crossDomain: true,
            data: {'cmd': 'xpay', 'charge_id': id},
            dataType: 'json',
            success: function(data) {
                    alert(data.message);
                    if (data.message === "Payment Refunded"){
                           getPayments(); 
                    }
            }, error: function(data){
    
                alert(data.message);
            }
        });

    } else {
        console.log("...");
    }
}

function showC(id){
   
    var filter = customers.filter(a => a.idc == id);
    var filtered = filter[0];
    var address = filtered.cssc + ', '+filtered.cstc +', '+ filtered.cstate + ', '+filtered.cscc + ' ' + filtered.cspc;
     $('#customerId').text(filtered.idc);
     $('#cname').text(filtered.cnc);
     $('#c-email').text(filtered.cec);
     $('#c-phone').text(filtered.cpc);
     $('#c-address').text(address);
     getOrders(filtered.idc);
}
function hideTables(){
    var x = document.getElementsByClassName("tabless");
   var i;
   for (i = 0; i < x.length; i++) {
       x[i].style.display = 'none';
   }

   }
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function getCustomers(){
    if (customers == null) {
        fillCustomers();
    }
    var table = $('#tbl_c').DataTable();
 
         
    table.destroy();
    $("#cbody").empty(); 
      
       $.each(customers, function(key,value) {
        var tdate = new Date(value.cdc);
 				
 $('#tbl_c  > tbody:last-child').append('<tr id='+ value.idc +' data-toggle="modal" data-target="#cModal" onclick="showC(id)" style="cursor: pointer"><td>'+ value.cnc+ '</td><td>'+
                                   value.cec +'</td><td>'+                                  
                  monthNames[tdate.getMonth()] + ' '+ tdate.getDate() + ', ' +tdate.getFullYear() +'</td></tr>');

					});
                    $('#tbl_c').DataTable({
                        "aaSorting": [] 
                       }); 
                       $("#tbl_customers").fadeIn();
                       $('body').toggleClass('loading');
       

}
function fillCustomers(){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/curly.php',
        crossDomain: true,
        data: {'cmd': 'customers'},
        dataType: 'json',
        success: function(data) {
                customers = data;
        }

    });
}
function fillPayments(){
    $.ajax({
        type: 'POST',
        url: 'https://kaisercoach.com/api/curly.php',
        crossDomain: true,
        data: {'cmd': 'payments'},
        dataType: 'json',
        success: function(data) {
                payments = data;
        }

    });
}
function getPayments() {
    var table = $('#tbl_p').DataTable();
 
         
    table.destroy();
    $("#pbody").empty();
   
    // $.ajax({
    //     type: 'POST',
    //     url: 'https://kaisercoach.com/api/curly.php',
    //     crossDomain: true,
    //     data: {'cmd': 'payments'},
    //     dataType: 'json',
    //     success: function(data) {
    //        payments = data;
           $.each(payments, function(key,value) {
            var tdate = new Date(value.aod);
            var cents = parseFloat(value.cs);
            var amount;
            if(cents === 0){
                cents = ".00";
                amount = value.cpp + cents;
            } else {
                amount = (parseFloat(value.cpp) + cents);
            }
           var btnd = "";
           var btntxt = "Refund";
           var btnColor = "btn-danger"
           if (value.aov === "0"){
                btnd = "disabled";
                btntxt = "Refunded"
                btnColor = "";
           }
     $('#tbl_p  > tbody:last-child').append('<tr id='+ value.aci +'>'+
            
     '<td style="color: #000;">$'+ amount +'</td>'+
                 '<td> Payment for '+  value.cpn +'</td>'+    
                 '<td>'+  value.bce +'</td>'+                                
                  '<td>'+  monthNames[tdate.getMonth()] + ' '+ tdate.getDate() + ', ' +tdate.getFullYear() +'</td>'+
                  
                  '<td><button type="button" class="btn '+ btnColor +' payment-refund" id="'+ value.aci +'" onclick="refund(id)" '+ btnd +'>'+ btntxt +'</button> </td>  '+
                  '</tr>');
    
                        });
                        $('#tbl_p').DataTable({
                            "aaSorting": [] 
                           }); 
                           $("#tbl_payments").fadeIn();
                           $('body').toggleClass('loading');
            // },
            // error: function(response) {
    
            //     console.log(response);
            // }
    
            // });


}

function getOrders(cust_id) {
    var orders = payments.filter(a => a.cid == cust_id);
    console.log(orders);
    var table = $('#customerOrderTable').DataTable();
 
         
    table.destroy();
    $("#customerOrderTbody").empty();
        
    
           $.each(orders, function(key,value) {
            var tdate = new Date(value.aod);
            var cents = parseFloat(value.cs);
            var amount;
            if(cents === 0){
                cents = ".00";
                amount = value.cpp + cents;
            } else {
                amount = (parseFloat(value.cpp) + cents);
            }
           var btnd = "";
           var btntxt = "Refund";
           var btnColor = "btn-danger"
           if (value.aov === "0"){
                btnd = "disabled";
                btntxt = "Refunded"
                btnColor = "";
           }
     $('#customerOrderTable  > tbody:last-child').append('<tr id='+ value.aci +'>'+
            
     '<td style="color: #000;">$'+ amount +'</td>'+
                 '<td> Payment for '+  value.cpn +'</td>'+    
                                              
                  '<td>'+  monthNames[tdate.getMonth()] + ' '+ tdate.getDate() + ', ' +tdate.getFullYear() +'</td>'+
                  
                  '<td><button type="button" class="btn '+ btnColor +' payment-refund" id="'+ value.aci +'" onclick="refund(id)" '+ btnd +'>'+ btntxt +'</button> </td>  '+
                  '</tr>');
    
                        });
                        $('#customerOrderTable').DataTable({
                            "aaSorting": [] 
                           }); 
                           $("#customerOrders").show();
                        
                            }


$(".cmd-link").click(function() {
    hideTables();
    $('body').toggleClass('loading');
    var cmd = $(this).data("cmd");
        if (cmd === "customers") {

           
                getCustomers();
        }
        if (cmd === "payments") {
            
                getPayments();
        }
});

