<?php
    include_once "./includes/class-autoload.inc.php";

    header("Content-type: application/json");
    header('Access-Control-Allow-Origin: *');

    $json = file_get_contents("php://input");

    $obj = json_decode($json);
    // $file = "sample.txt";
    
    // file_put_contents($file, "data: ".$obj->data);

    $deviceName = $obj->deviceName;
    $deveui = $obj->devEUI;
    $gateway_id = $obj->rxInfo[0]->gatewayID;
    $frequency = $obj->txInfo->frequency;
    $data = $obj->data;
    $fPort = $obj->fPort;

    $object = new DeviceService();

    $object->setReading($deviceName, $deveui, $gateway_id, $frequency, $data, $fPort);

    // $reading = $object->getLastReading("3333333333333385");
    // if ($reading == "No Reading Found") {
    //     echo "no reading";
    // } else {
    //     echo "reading";
    // }
