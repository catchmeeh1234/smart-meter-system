<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Content-type: application/json");

    include_once "./includes/class-autoload.inc.php";
    include_once './classes/constants.php';

    //echo $_POST['billno'];
    $json = file_get_contents("php://input");

    $obj = json_decode($json);

    $CustomerType =  $obj->CustomerType;
    $MeterSize =  $obj->MeterSize;
    $MinimumCharge =  $obj->MinimumCharge;
    $ElevenToTwenty =  $obj->ElevenToTwenty;
    $TwentyOneToThirty =  $obj->TwentyOneToThirty;
    $ThirtyOneToForty =  $obj->ThirtyOneToForty;
    $FortyOneToFifty =  $obj->FortyOneToFifty;
    $FiftyOneAndUp =  $obj->FiftyOneAndUp;
    $id = $obj->RateSchedulesID;

    $object = new RateSchedule();
    echo json_encode($object->editWaterRates($CustomerType, $MeterSize, $MinimumCharge, $ElevenToTwenty, $TwentyOneToThirty, $ThirtyOneToForty, $FortyOneToFifty, $FiftyOneAndUp, $id));