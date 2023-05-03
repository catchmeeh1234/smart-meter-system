<?php

    include_once "./includes/class-autoload.inc.php";

    $deviceEUI = $_GET['deveui'];

    $obj = new DeviceService();

    echo $obj->getLastReading($deviceEUI);