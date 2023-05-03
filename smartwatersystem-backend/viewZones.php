<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $viewZones = new Zone();
    echo json_encode($viewZones->getZones());