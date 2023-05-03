<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $deveui = $_POST['DeviceEUI'];

    $object = new Concessionaire();

    echo json_encode($object->unbindSmartMeter($deveui));