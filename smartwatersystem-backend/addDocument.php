<?php
    include_once "./includes/class-autoload.inc.php";
    // require_once "./includes/connect.inc.php";
    // require_once './classes/document.class.php';

    $refno = $_POST['refno'];
    $number = $_POST['number'];
    $file = $_FILES['document'];

    $addDocument = new Document();
    $addDocument->addDocument($refno, $number, $file);