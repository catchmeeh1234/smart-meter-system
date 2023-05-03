<?php

    include_once "./includes/class-autoload.inc.php";

    $obj = new InternalService();

    echo json_decode($obj->getJWT())->jwt;
    //phpinfo();