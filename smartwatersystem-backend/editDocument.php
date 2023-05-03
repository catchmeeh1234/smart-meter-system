<?php
    include_once "./includes/class-autoload.inc.php";

    $file = $_FILES['document'];

    $id = $_POST['document_id'];

    $edit = new Document();
    $edit->editDocument($id, $file);