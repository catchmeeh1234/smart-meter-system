<?php
    include_once "./includes/class-autoload.inc.php";

    $id = $_GET['id'];

    $delete = new Document();
    $delete->deleteDocument($id);