<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $firstname = $_GET['firstname'];
    $lastname = $_GET['lastname'];
    $username = $_GET['username'];
    $password = $_GET['password'];
    $role = $_GET['role'];

    $viewConcessionaires = new Concessionaire();

    echo json_encode($viewConcessionaires->addUserAccount($firstname, $lastname, $username, $password, $role));