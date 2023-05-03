<?php
    //header("Content-type: application/json");
    header('Access-Control-Allow-Origin: *');
    date_default_timezone_set("Asia/Manila");

    //include_once "./includes/class-autoload.inc.php";
    
    $data = "ARAxAQAAhQXZBgAACbgAAg==";

    $binary = base64_decode($data);
    $hex = bin2hex($binary);

    if (date("H:i") != '11:52') {
        exit();
    }

    $fPort = 1;
    switch ($fPort) {
        case 24:
            // Code to execute if expression == value1
            $reading = substr($hex, 18, 8);
            break;
        case 25:
            // Code to execute if expression == value2
            $reading = substr($hex, 4, 8);
            break;
        // ...
        default:
            $message = "Invalid Port";
            echo $message;
            return;
    }

    $bin = hex2bin($reading);
            
    // Reverse the order of the bytes
    $reversed = strrev($bin);
    // Convert the reversed binary string back to a hexadecimal string
    $flipped_hex = bin2hex($reversed);
    $result = hexdec($flipped_hex);
    echo $result;