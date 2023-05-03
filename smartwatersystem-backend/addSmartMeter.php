<?php
    include_once "./includes/class-autoload.inc.php";
    // require_once "./includes/connect.inc.php";
    // require_once './classes/document.class.php';

    $device_name = $_POST['devicename'];
    $device_deveui = $_POST['devicedeveui'];
    $gateway_id = $_POST['gatewayid'];
    $reading = $_POST['reading'];

    $addDocument = new SmartMeter();
    echo json_encode($addDocument->addSmartMeter($device_name, $device_deveui, $gateway_id, $reading));