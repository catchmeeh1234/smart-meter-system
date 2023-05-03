<?php
     //header('Access-Control-Allow-Origin: *');

     include_once "./includes/class-autoload.inc.php";

     $obj = new RateSchedule();

     echo json_encode($obj->getCustomerType()); 
