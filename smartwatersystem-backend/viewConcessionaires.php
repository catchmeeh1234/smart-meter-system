<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $zone = $_GET['ZoneName'];

    $viewConcessionaires = new Concessionaire();
    
    echo json_encode($viewConcessionaires->getConcessionaires($zone));