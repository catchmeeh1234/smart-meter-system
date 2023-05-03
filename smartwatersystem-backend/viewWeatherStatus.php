<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $id = 1;

    $obj = new Weather();

    echo json_encode($obj->getWeatherStatus($id));