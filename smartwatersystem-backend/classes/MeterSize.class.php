<?php
//require_once "../includes/class-autoload.inc.php";
header('Access-Control-Allow-Origin: *');

// require_once "./connect.inc.php";
// require_once "./logicnumbers.class.php";

class MeterSize extends Connect
{
    public function __construct()
    {
        
    }

    public function getMeterSizes() {
        $connection = $this->openConnection();

        $sql = "SELECT DISTINCT MeterSize FROM RateSchedules;";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No MeterSizes found');
            //echo json_encode($arrayDocuments);
            //return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            return $result;
        }
    }
}