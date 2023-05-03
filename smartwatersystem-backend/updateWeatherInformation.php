<?php
    header('Access-Control-Allow-Origin: *');


    $city = $_GET['city'];
    $country = $_GET['country'];
    $temperature = $_GET['temperature'];

    include_once "./includes/class-autoload.inc.php";

    $obj = new Weather();

    $obj->setWeatherStatus($city, $country, $temperature);