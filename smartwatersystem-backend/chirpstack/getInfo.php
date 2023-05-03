<?php
    include_once "./includes/class-autoload.inc.php";

    $obj = new DeviceService();
    $getJWT = new InternalService();

    $jwt = json_decode($getJWT->getJWT())->jwt;
    $devEUI = '70b3d5b020045201';

    echo $obj->getDeviceName($jwt, $devEUI);
