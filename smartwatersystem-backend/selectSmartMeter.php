<?php
    include_once "./includes/class-autoload.inc.php";
    // require_once "./includes/connect.inc.php";
    // require_once './classes/document.class.php';

    $device_deveui = $_GET['deveui'];

    $obj = new SmartMeter();
    echo json_encode($obj->selectSmartMeter($device_deveui));