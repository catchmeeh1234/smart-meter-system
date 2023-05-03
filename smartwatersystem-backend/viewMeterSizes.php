<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $obj = new MeterSize();

    echo json_encode($obj->getMeterSizes());