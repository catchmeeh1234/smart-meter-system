<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $zone = $_GET['ZoneName'];
    $billingmonth = $_GET['BillingMonth'];

    $obj = new Bill();

    echo json_encode($obj->getBills($zone, $billingmonth));