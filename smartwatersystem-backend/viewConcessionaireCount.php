<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $viewConcessionaires = new Concessionaire();

    echo count($viewConcessionaires->getAllConcessionaires());