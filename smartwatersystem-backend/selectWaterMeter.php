<?php
    include_once "./includes/class-autoload.inc.php";

    $meterno = $_GET['meterno'];

    $viewWaterMeter = new Concessionaire();

    echo json_encode($viewWaterMeter->getWaterMeter($meterno));