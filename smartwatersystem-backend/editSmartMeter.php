<?php
    include_once "./includes/class-autoload.inc.php";
    // require_once "./includes/connect.inc.php";
    // require_once './classes/document.class.php';

    $devicename = $_POST['devicename'];
    $device_deveui = $_POST['devicedeveui'];
    $gatewayid = $_POST['gatewayid'];
    $reading = $_POST['reading'];
    $id = $_POST['id'];

    $obj = new SmartMeter();
    echo json_encode($obj->editSmartMeter($devicename, $device_deveui, $gatewayid, $reading, $id));