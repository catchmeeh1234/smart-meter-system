<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $logic = new LogicNumbers();

    $remarks = $_GET['remarks'];
    echo $logic->fetchLogicNumbers($remarks);