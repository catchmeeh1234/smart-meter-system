<?php
//require_once "../includes/class-autoload.inc.php";
header('Access-Control-Allow-Origin: *');

// require_once "./connect.inc.php";
// require_once "./logicnumbers.class.php";

class SmartMeter extends Connect
{
    public function __construct()
    {
        
    }

    public function editSmartMeter($devicename, $device_deveui, $gatewayid, $reading, $id) {
        $connection = $this->openConnection();

        $sql = "UPDATE SmartMeters SET device_name = :device_name, device_deveui = :device_deveui, gateway_id = :gateway_id, reading = :reading WHERE id = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(array(':device_name' => $devicename, ':device_deveui' => $device_deveui, ':gateway_id' => $gatewayid, ':reading' => $reading, ':id' => $id));
        $count = $stmt->rowCount();
        if ($count == 1) {
            $arrayMessage = array('status' => 'Smart Meter Updated Successfully');
        } else{
            $arrayMessage = array('status' => 'Smart Meter Update Failed');
        }
        return $arrayMessage;
    }

    public function selectSmartMeter($deveui) {
        $connection = $this->openConnection();

        $sql = "SELECT * FROM SmartMeters WHERE device_deveui = '$deveui'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayMessage = array('status' => 'No Smart Meter Found');
        } else {
            return $result;
        }
        return $arrayMessage;
    }

    public function getSmartMeters() {
        $connection = $this->openConnection();

        $sql = "SELECT * FROM SmartMeters";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Smart Meters found');
            //echo json_encode($arrayDocuments);
            //return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            return $result;
        }
    }
    public function readSmartMeter($account_number) {
        $connection = $this->openConnection();
        $sql = "SELECT * FROM Bills WHERE BillStatus = 'Pending' AND Cancelled = 'No' AND AccountNumber = '$account_number'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $count = $stmt->rowCount();
        if ($count == 0) {
            //$qrySearchBill = "SELECT * FROM Bills WHERE AccountNumber = '$account_number' and BillingDate = '" & billCovered.Text & "' and Cancelled = 'No'";

        } else {
            $arrayMessage = array('status' => 'There are pending bills');
            return $arrayMessage;
        }
    }

    public function addSmartMeter($device_name, $device_deveui, $gateway_id, $reading) {
        $connection = $this->openConnection();

        $qryDuplicate = "SELECT * FROM SmartMeters WHERE device_deveui = '$device_deveui'";
        $checkDuplicate = $connection->prepare($qryDuplicate);
        $checkDuplicate->execute();
        $countDuplicate = $checkDuplicate->rowCount();

        if ($countDuplicate == 0) {
            $currenttime = date("Y-m-d h:i:s A");
            $sql = "INSERT INTO SmartMeters(device_name, device_deveui, gateway_id, reading, time) VALUES(:device_name, :device_deveui, :gateway_id, :reading, :time)";
            $stmt = $connection->prepare($sql);
            $stmt->execute(array(':device_name' => $device_name, ':device_deveui' => $device_deveui, ':gateway_id' => $gateway_id, ':reading' => $reading, ':time' => $currenttime));
            $count = $stmt->rowCount();

            if ($count == 1) {
                $arrayMessage = array('status' => 'Smart Meter Added Successfully');
            } else {
                $arrayMessage = array('status' => 'Error adding Smart Meter');
                //print_r($stmt->errorInfo());
            }

        } else {
            $arrayMessage = array('status' => 'Smart Meter Already Exist');
        }

        return $arrayMessage;
    }
}