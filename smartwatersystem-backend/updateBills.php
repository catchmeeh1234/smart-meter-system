<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Content-type: application/json");

    include_once "./includes/class-autoload.inc.php";
    include_once './classes/constants.php';

    //echo $_POST['billno'];
    $json = file_get_contents("php://input");

    $obj = json_decode($json);

    $reading =  $obj->reading;
    $billno =  $obj->billno;

    $object = new Bill();
    echo json_encode($object->updateBill($reading, $billno));