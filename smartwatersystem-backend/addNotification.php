<?php
    header('Access-Control-Allow-Origin: *');
    
    include_once "./includes/class-autoload.inc.php";
    // require_once "./includes/connect.inc.php";
    // require_once './classes/document.class.php';

    $title = $_POST['title'];
    $message = $_POST['message'];

    $obj = new Notification();
    echo json_encode($obj->addNotification($title, $message));