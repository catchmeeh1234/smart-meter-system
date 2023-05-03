<?php

    include_once "./includes/class-autoload.inc.php";

    $deviceEUI = $_GET['deveui'];
    $timeline = $_GET['timeline'];

    $obj = new DeviceService();

    echo json_encode($obj->getConsumptionPattern($deviceEUI, $timeline));