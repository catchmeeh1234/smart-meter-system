<?php
    include_once "./includes/class-autoload.inc.php";

    $accno = $_GET['accno'];

    $read = new SmartMeter();

    echo json_encode($read->readSmartMeter($accno));