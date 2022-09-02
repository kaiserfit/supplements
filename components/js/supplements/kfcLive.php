<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');



// if (isset($_SERVER['HTTP_ORIGIN'])){

//   switch ($_SERVER['HTTP_ORIGIN']) {
//    case 'https://kaiserbody.com': 
//    header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
//    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
//    header('Access-Control-Max-Age: 1000');
//    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
//    break;
//    case 'https://queenformula.net':
//      header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
//      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
//      header('Access-Control-Max-Age: 1000');
//      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
//      break;
//      case null:
     
//        break;
//  }
// } else {
//   header('Access-Control-Allow-Origin: *');
//        header('Access-Control-Allow-Methods: POST, OPTIONS');
//        header('Access-Control-Max-Age: 1000');
//        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// }

require 'vendor/autoload.php';

 

$customerid = $_POST["uid"];
$itemid = $_POST["plan"];




//generated token from form = $token

\Stripe\Stripe::setApiKey('sk_live_rQ1AeTlZhy0glKeBEN6idfkm');

$stripe = new \Stripe\StripeClient(
    'sk_live_rQ1AeTlZhy0glKeBEN6idfkm'
  );
//retrieve customer
  $cstmr = $stripe->customers->retrieve(
    $customerid,
    []
  );

 

    
    $stripe = new \Stripe\StripeClient(
      'sk_live_rQ1AeTlZhy0glKeBEN6idfkm'
    );

 

  




  


   
   
   
    $sub = "";
    $trial = 0;
    if ($itemid === "19") {
      $sub = "plan_JLBaHYgXkWqScr";
      $trial = 30;
    }
    if ($itemid === "47") {
      $sub = "price_1JMoPGGEnOOm6AiQrTJU1irG";
      $trial = 14;
    }
    if ($itemid === "79") {
      $sub = "price_1JMoYwGEnOOm6AiQu31BX1U0";
      $trial = 14;
    }

    $charge  = $stripe->subscriptions->create([
      'customer' =>$customerid,
      'items' => [
        ['price' => 'price_1JMoYwGEnOOm6AiQu31BX1U0'],
      ],
      'trial_period_days'=> 14
    ]);
      

      
    

   

 
    if ($charge){
    
      echo "Subscription created";
    } else {
      
      echo "Something Went Wrong";
    
    }

