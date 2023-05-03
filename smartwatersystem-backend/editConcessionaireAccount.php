<?php
    header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $companyname = $_POST['companyname'];
    $landmark = $_POST['landmark'];
    $serviceaddress = $_POST['serviceaddress'];
    $contactno = $_POST['contactno'];
    $id = $_POST['customerid'];
    $readingseqno = $_POST['readingseqno'];
    $zone = $_POST['zone'];
    $rates = $_POST['rates'];
    $metersize = $_POST['metersize'];
    $datecreated = $_POST['datecreated'];
    $dateinstalled = $_POST['dateinstalled'];
    $customerstatus = $_POST['customerstatus'];

    

    $obj = new Concessionaire();

    echo json_encode($obj->editConcessionaireAccount($id, $firstname, $lastname, $companyname, $landmark, $serviceaddress, $contactno, $readingseqno, $zone, $rates, $metersize, $datecreated, $dateinstalled, $customerstatus));