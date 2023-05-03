<?php
//require_once "../includes/class-autoload.inc.php";
header('Access-Control-Allow-Origin: *');

// require_once "./connect.inc.php";
// require_once "./logicnumbers.class.php";

class Notification extends Connect
{
    public function __construct()
    {
        
    }

    public function addNotification($title, $message) {
        $datenow = date("Y-m-d h:i:s A");

        if ($title == "" || $message == "") {
            exit("Failed");
        }

        $connection = $this->openConnection();

        $sql = "INSERT INTO notifications (notif_title, notif_message, notif_datetime) VALUES(:title, :message, :datetime)";
        $stmt = $connection->prepare($sql);
        $stmt->execute(array(':title' => $title, ':message' => $message,':datetime' => $datenow));
        $count = $stmt->rowCount();

        if ($count == 1) {
            $arrayMessage = array('status' => 'Notification Added Successfully');
        } else {
            $arrayMessage = array('status' => 'Notification insert failed');
        }

        return $arrayMessage;
    }

    public function viewNotification() {
        $connection = $this->openConnection();

        $sql = "SELECT * FROM notifications ORDER BY notif_id DESC";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Notification found');
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