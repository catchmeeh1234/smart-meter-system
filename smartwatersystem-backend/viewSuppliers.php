<?php
    //header('Access-Control-Allow-Origin: *');

    include_once "./includes/class-autoload.inc.php";

    $viewSuppliers = new Supplier();
    echo json_encode($viewSuppliers->getSuppliers());