<?php
     include_once "./includes/class-autoload.inc.php";

     $account_no = $_GET['accno'];

     $obj = new Concessionaire();
     echo json_encode($obj->selectConcessionaire($account_no));
