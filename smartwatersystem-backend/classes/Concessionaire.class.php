<?php
//require_once "../includes/class-autoload.inc.php";
header('Access-Control-Allow-Origin: *');

// require_once "./connect.inc.php";
// require_once "./logicnumbers.class.php";

class Concessionaire extends Connect
{
   public function getConcessionaires($zone) {
        $connection = $this->openConnection();

        if ($zone == "All") {
            $sql = "SELECT Lastname, Firstname, AccountNo, ContactNo, CustomerStatus, LastMeterReading, Zone FROM Customers";

        } else {
            $sql = "SELECT Lastname, Firstname, AccountNo, ContactNo, CustomerStatus, LastMeterReading, Zone FROM Customers WHERE Zone = '$zone'";
        }
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $concessionaires = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Concessionaires found');
            //echo json_encode($arrayDocuments);
            return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            return $concessionaires;
        }
   }

   public function getAllConcessionaires() {
        $connection = $this->openConnection();
        $sql = "SELECT AccountNo, Zone, CONCAT(Firstname, ' ', Middlename, ' ', Lastname) AS CustomerName FROM Customers";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $concessionaires = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Concessionaires found');
            //echo json_encode($arrayDocuments);
            return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            return $concessionaires;
        }
   }

   public function getActiveConcessionaire() {
        $connection = $this->openConnection();
        $sql = "SELECT AccountNo FROM Customers WHERE CustomerStatus='Active'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $concessionaires = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Concessionaires found');
            //echo json_encode($arrayDocuments);
            return $count;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            return $count;
        }
   }

   public function getDisconnectedConcessionaire() {
    $connection = $this->openConnection();
    $sql = "SELECT AccountNo FROM Customers WHERE CustomerStatus='Disconnected'";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $concessionaires = $stmt->fetchAll();
    $count = $stmt->rowCount();
    if ($count == 0) {
        $arrayDocuments = array('status' => 'No Concessionaires found');
        //echo json_encode($arrayDocuments);
        return $count;
    } else {
        // foreach($documents as $document) {
        //     echo $document['document_id'] . "<br>";
        // }
        //print_r(json_encode($concessionaires));
        return $count;
    }
}

   public function selectConcessionaire($account_no) {
        $connection = $this->openConnection();
        //$sql = "SELECT * FROM Customers WHERE AccountNo = '$account_no'";
        $sql = " SELECT * FROM Customers LEFT JOIN SmartMeters
        ON Customers.devEUI = SmartMeters.device_deveui WHERE AccountNo = '$account_no'";

        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();

        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Concessionaire found');
            //echo json_encode($arrayDocuments);
            return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            return $result;
        }
   }

   public function getWaterMeter($meterno) {
        $connection = $this->openConnection();
        $sql = "SELECT MeterNo, ReadingSeqNo FROM Customers WHERE MeterNo = '$meterno'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();

        if ($count == 0) {
            $arrayDocuments = array('status' => 'No Meter found');
            //echo json_encode($arrayDocuments);
            return $arrayDocuments;
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            return $result;
        }
   }

   public function addUserAccount($firstname, $lastname, $username, $password, $role) {
        $connection = $this->openConnection();

        //validate username if already exist
        $sql = "SELECT username FROM UserAccounts WHERE username = '$username'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();

        if ($count == 0) {
            $fullname = $firstname . " " . $lastname;

            $sql1 = "INSERT INTO UserAccounts (username, password, fullname, role) VALUES(:username, :password, :fullname, :role)";
            $stmt1 = $connection->prepare($sql1);
            $stmt1->execute(array(':username' => $username, ':password' => $password,':fullname' => $fullname, ':role' => $role));
            $count1 = $stmt1->rowCount();

            if ($count1 == 1) {
                $arrayMessage = array('status' => 'Account Added Successfully');
            } else {
                $arrayMessage = array('status' => 'Add account failed');
            }

            return $arrayMessage;
        } else {
            $arrayMessage = array('status' => 'Username already exist');
            return $arrayMessage;
        }
   }

   public function editConcessionaireAccount($id, $firstname, $lastname, $companyname, $landmark, $serviceaddress, $contactno, $readingseqno, $zone, $rates, $metersize, $datecreated, $dateinstalled, $customerstatus) {
        $connection = $this->openConnection();

        //validate customer id if exist
        $sql = "SELECT AccountNo FROM Customers WHERE CustomerID = '$id'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();

        if ($count == 1) {

            $sql1 = "UPDATE Customers SET Firstname = :firstname, Lastname = :lastname, CompanyName = :companyname, LandMark =  :landmark, 
                    ServiceAddress = :serviceaddress, ContactNo =  :contactno, ReadingSeqNo = :readingseqno, Zone =  :zone, RateSchedule = :rate,
                    MeterSize = :metersize, DateCreated =  :datecreated, DateInstalled = :dateinstalled, CustomerStatus = :customerstatus
                    WHERE CustomerID = :customerID";

            $stmt1 = $connection->prepare($sql1);
            $stmt1->execute(array(':firstname' => $firstname, ':lastname' => $lastname,':companyname' => $companyname, ':landmark' => $landmark, ':serviceaddress' => $serviceaddress, ':contactno' => $contactno, ':readingseqno' => $readingseqno, ':zone' => $zone,  ':rate' => $rates,  ':metersize' => $metersize,  ':datecreated' => $datecreated,  ':dateinstalled' => $dateinstalled, ':customerstatus' => $customerstatus, ':customerID' => $id));
            $count1 = $stmt1->rowCount();

            if ($count1 == 1) {
                $arrayMessage = array('status' => 'Account Updated Successfully');
            } else {
                print_r($stmt1->errorInfo());
                $arrayMessage = array('status' => 'Updating account failed');
            }

            return $arrayMessage;
        } else {
            $arrayMessage = array('status' => 'ID does not exist');
            return $arrayMessage;
        }
   }

    public function bindSmartMeter($account_no, $deviceEUI) {
        $connection = $this->openConnection();
        $checkDuplicate = "SELECT devEUI FROM Customers WHERE devEUI='$deviceEUI'";
        $stmt1 = $connection->prepare($checkDuplicate);
        $stmt1->execute();
        $res = $stmt1->fetchAll();
        $count1 = $stmt1->rowCount();

        if ($count1 == 0) {
            $sql = "UPDATE Customers SET devEUI = :devEUI WHERE AccountNo = :AccountNo";
            $stmt = $connection->prepare($sql);
            $stmt->execute(array(':devEUI' => $deviceEUI, ':AccountNo' => $account_no));
            $count = $stmt->rowCount();
            if ($count == 1) {
                $arrayMessage = array('status' => 'Smart meter binded');
            } else {
                $arrayMessage = array('status' => 'Error binding smart meter');
            }
        } else {
            $arrayMessage = array('status' => 'Smart Meter ' . $deviceEUI . ' is already binded to a concessionaire');
        }
        return $arrayMessage;
    }

    public function unbindSmartMeter($deviceEUI) {
        $connection = $this->openConnection();
        $sql = "UPDATE Customers SET devEUI = :devEUI WHERE devEUI = :dev_eui";
        $stmt = $connection->prepare($sql);
        $stmt->execute(array(':devEUI' => null, ':dev_eui' => $deviceEUI));
        $count = $stmt->rowCount();

        if ($count == 1) {
            $arrayMessage = array('status' => 'Smart Meter ' . $deviceEUI . ' unbinded successfully');
        } else {
            $arrayMessage = array('status' => 'Smart Meter ' . $deviceEUI . ' unbind failed');
        }
        return $arrayMessage;
    }

   public function addConcessionaireAccount($firstname, $lastname, $companyname, $landmark, $serviceaddress, $contactno, $readingseqno, $zone, $rates, $metersize, $datecreated, $dateinstalled, $customerstatus, $accountno, $user, $meterno) {
        $connection = $this->openConnection();

        $sql = "SELECT AccountNo FROM Customers WHERE CustomerStatus='Disconnected'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $concessionaires = $stmt->fetchAll();
        $count = $stmt->rowCount();

        $qry = "SELECT AccountNo FROM Customers WHERE AccountNo = '$accountno'";
        $checkDuplicate = $connection->prepare($qry);
        $checkDuplicate->execute();
        $checkDuplicate->fetchAll();

        $countDuplicates = $checkDuplicate->rowCount();

        if ($countDuplicates >= 1) {
            $arrayMessage = array('status' => 'Account Number Already Exist');
        } else {
            //ADD ACCOUNT TO DATABASE
            $sql = "INSERT INTO Customers (AccountNo, Lastname, Firstname, ServiceAddress, ContactNo, ReadingSeqNo, CustomerStatus, IsSenior, Zone, RateSchedule, DateCreated, DateInstalled, InstalledBy, CompanyName, LandMark, MeterSize, MeterNo)
            VALUES (:account_no, :lastname, :firstname, :serviceaddress, :contactno, :readingseqno, :customerstatus, :issenior, :zone, :rateschedule, :datecreated, :dateinstalled, :installedby, :companyname, :landmark, :metersize, :meterno)";
            $stmt = $connection->prepare($sql);
            $stmt->execute(array(':account_no' => $accountno, ':lastname' => $lastname, ':firstname' => $firstname,':serviceaddress' => $serviceaddress, ':contactno' => $contactno, ':readingseqno' => $readingseqno, ':customerstatus' => $customerstatus, ':issenior' => 'No', ':zone' => $zone,  ':rateschedule' => $rates, ':datecreated' => $datecreated,  ':dateinstalled' => $dateinstalled, ':installedby' => $user, ':companyname' => $companyname, ':landmark' => $landmark, ':metersize' => $metersize, ':meterno' => $meterno));
            //$result = $stmt->fetchAll();
            $count = $stmt->rowCount();

            if ($count == 1) {
                $qryUpdateLastNumber = "UPDATE Zones SET LastNumber = LastNumber + 1 WHERE ZoneName = :zonename";
                $stmt1 = $connection->prepare($qryUpdateLastNumber);
                $stmt1->execute(array(':zonename' => $zone));
                $count1 = $stmt1->rowCount();

                if ($count1 == 1) {
                    $arrayMessage = array('status' => 'Account Added Successfully');
                } 
            } else {
                print_r($stmt->errorInfo());
                $arrayMessage = array('status' => 'Adding account failed');
            }
        }

        return $arrayMessage;
    }
}