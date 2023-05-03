<?php
//require_once "../includes/class-autoload.inc.php";
header('Access-Control-Allow-Origin: *');

// require_once "./connect.inc.php";
// require_once "./logicnumbers.class.php";

class RateSchedule extends Connect
{
    public function __construct()
    {
        
    }

    public function editWaterRates($CustomerType, $MeterSize, $MinimumCharge, $ElevenToTwenty, $TwentyOneToThirty, $ThirtyOneToForty, $FortyOneToFifty, $FiftyOneAndUp, $id) {
        $connection = $this->openConnection();

        $sql = "UPDATE RateSchedules SET CustomerType = :customertype, MinimumCharge = :minimumcharge, 
                MeterSize = :metersize, twenty = :eleventotwenty, thirty = :twentyonetothirty, forty = :thirtyonetoforty, 
                fifty = :fortyonetofifty, maxx = :fiftyoneandup WHERE RateSchedulesID = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(array(
            ':customertype' => $CustomerType,
            ':minimumcharge' => $MinimumCharge, 
            ':metersize' => $MeterSize, 
            ':eleventotwenty' => $ElevenToTwenty,
            ':twentyonetothirty' => $TwentyOneToThirty,      
            ':thirtyonetoforty' => $ThirtyOneToForty,
            ':fortyonetofifty' => $FortyOneToFifty, 
            ':fiftyoneandup' => $FiftyOneAndUp, 
            ':id' => $id,
        ));
        $count = $stmt->rowCount();

        if ($count == 1) {
            $arrayMessage = array('status' => 'Water Rate Updated Successfully');
        } else {
            print_r($stmt->errorInfo());
            $arrayMessage = array('status' => 'Updating Water Rate Failed');
        }
        return $arrayMessage;
    }

    public function getWaterRates() {
        $connection = $this->openConnection();

        $sql = "SELECT * FROM RateSchedules ORDER BY RateSchedulesID DESC";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No RateSchedule found');
            //echo json_encode($arrayDocuments);
            //return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            return $result;
        }
    }

    public function getRateSchedule() {
        $connection = $this->openConnection();

        $sql = "SELECT DISTINCT CustomerType FROM RateSchedules";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No RateSchedule found');
            //echo json_encode($arrayDocuments);
            //return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            return $result;
        }
    }

    public function getCustomerType() {
        $connection = $this->openConnection();

        $sql = "SELECT * FROM CustomerType";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Customer Type found');
            //echo json_encode($arrayDocuments);
            //return $arrayDocuments;
            return array();
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            return $result;
        }

    }
}