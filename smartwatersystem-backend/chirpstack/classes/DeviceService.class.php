<?php
    header('Access-Control-Allow-Origin: *');

    date_default_timezone_set("Asia/Manila");

    class DeviceService extends Connect
    {
        public function getDeviceName($JWT, $devEUI) {
            $ch = curl_init();


            curl_setopt($ch, CURLOPT_URL, 'http://192.168.10.69:8080/api/devices/'.$devEUI);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


            $headers = array();
            $headers[] = 'Accept: application/json';
            $headers[] = "Grpc-Metadata-Authorization: Bearer " . $JWT;
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $result = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            return $result;

            curl_close($ch);
        }

        public function convertData($data, $fPort) {

            $binary = base64_decode($data);
            $hex = bin2hex($binary);

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
                    $message = "invalid port";
                    return $message;
            }

            $bin = hex2bin($reading);
                    
            // Reverse the order of the bytes
            $reversed = strrev($bin);
            
            // Convert the reversed binary string back to a hexadecimal string
            $flipped_hex = bin2hex($reversed);
            $result = hexdec($flipped_hex);
            return (1310 + $result) / 1000;
        }

        public function getLastReading($devEUI) {
            $connection = $this->openConnection();
            $sql = "SELECT * FROM SmartMeters WHERE device_devEUI = '$devEUI' ORDER BY id DESC";
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $count = $stmt->rowCount();
            if ($count == 0) {
                $arrayMessage = 'No Reading Found';
                return $arrayMessage;
            } else {
                foreach($result as $reading) {
                    return $reading['reading'];
                }
            }
        }

        public function setReading($deviceName, $deveui, $gateway_id, $frequency, $data, $fPort) {
            if ($deviceName == null || $deveui == null || $gateway_id == null || $frequency == null || $data == null || $fPort == null) {
                exit();
            }

            // if (date("H:i") != '12:25') {
            //     exit();
            // }

            //convert data base64 to hex
            $deveui = base64_decode($deveui);
            $deveui = bin2hex($deveui);
            $gateway_id = base64_decode($gateway_id);
            $gateway_id = bin2hex($gateway_id);

            //check if there was a previous reading
            $smartMeterReading = $this->getLastReading($deveui);
            $consumption = 0;

            //convert data to liters
            $flippedHex = $this->convertData($data, $fPort);

            if ($flippedHex == "invalid port") {
                $consumption = "0";
                exit($flippedHex);
            } else {
                if ($smartMeterReading == "No Reading Found") {
                    $consumption = $flippedHex;
                } else {
                    $consumption = $flippedHex - $smartMeterReading;
                }
            }

            $datenow = date("Y-m-d h:i:s A");
            $connection = $this->openConnection();

            // if (date("H:i") == '10:01') {
                
            // }
            $sql = "INSERT INTO SmartMeterReadings (devEUI, deviceName, fPort, frequency, rawData, readingTime, currentReading, consumption) VALUES(:devEUI, :deviceName, :fPort, :frequency, :rawData, :readingTime, :currrentReading, :consumption)";
            $stmt = $connection->prepare($sql);
            $stmt->execute(array(':devEUI' => $deveui, ':deviceName' => $deviceName, ':fPort' => $fPort, ':frequency' => $frequency, ':rawData' => $data, ':readingTime' => $datenow, ':currrentReading' => $flippedHex, ':consumption' => $consumption));
            $count = $stmt->rowCount();

            if ($count == 1) {
                if ($flippedHex != "invalid port") {
                    $qryUpdateReading = "UPDATE SmartMeters SET reading = :reading WHERE device_deveui = :dev_eui";
                    $stmtUpdateReading = $connection->prepare($qryUpdateReading);
                    $stmtUpdateReading->execute(array(':reading' => $flippedHex, ':dev_eui' => $deveui));
                    $count = $stmtUpdateReading->rowCount();
                    if ($count == 1) {
                        echo "Insert Success";
                    } else {
                        print_r($stmt->errorInfo());
                    }
                }
            } else {
                //echo "Insert Failed". $count;
                print_r($stmt->errorInfo());
            }
        }

        public function getConsumptionPattern($deviceEUI, $timeline) {
            $connection = $this->openConnection();
            if ($timeline == "Daily") {
                $sql = "SELECT TOP(30) FORMAT(CAST(readingTime AS datetime), 'MMM. dd') as readingTime, SUM(CAST(consumption AS decimal(10,2))) as consumption
                        FROM SmartMeterReadings WHERE devEUI = '$deviceEUI' AND fPort=25
                        GROUP BY FORMAT(CAST(readingTime AS datetime), 'MMM. dd') ORDER BY readingTime ASC";

                // $sql = "SELECT TOP(30) CONVERT(VARCHAR(20), CONVERT(DATE, readingTime), 107) as readingTime, SUM(CAST(consumption AS decimal(10,2))) as consumption
                //         FROM SmartMeterReadings WHERE devEUI = '$deviceEUI' AND fPort=25
                //         GROUP BY CONVERT(VARCHAR(20), CONVERT(DATE, readingTime), 107) ORDER BY readingTime ASC";                        
            }
            if ($timeline == "Hourly") {
                $sql = "SELECT *
                        FROM (
                            SELECT TOP (24) FORMAT(CAST(readingTime AS datetime), 'MMMM d, h:mm tt') as readingTime, consumption, id
                            FROM SmartMeterReadings WHERE devEUI = '$deviceEUI' and fPort=25 ORDER BY id desc
                        ) AS subquery
                        ORDER BY id ASC";
                // $sql = "SELECT *
                //         FROM (
                //             SELECT TOP (24) CONVERT(TIME(0), readingTime) as readingTime, consumption, id
                //             FROM SmartMeterReadings WHERE devEUI = '$deviceEUI' and fPort=25 ORDER BY id desc
                //         ) AS subquery
                //         ORDER BY id ASC";

                // $sql = "SELECT *
                //         FROM (
                //             SELECT TOP (24) CONVERT(varchar(15), CONVERT(time, readingTime), 100) AS readingTime, consumption, id
                //             FROM SmartMeterReadings WHERE devEUI = '$deviceEUI' and fPort=25 ORDER BY id desc
                //         ) AS subquery
                //         ORDER BY id ASC";
            }
            if ($timeline == "Monthly") {
                $sql = "SELECT TOP (12) CONVERT(VARCHAR(20), CONVERT(DATE, readingTime), 107) as readingTime, consumption,
                        ROW_NUMBER() OVER (ORDER BY id DESC) as RowNum FROM SmartMeterReadings WHERE DAY(readingtime) = 8 AND DATEPART(hour, readingTime) = 16 AND devEUI = '$deviceEUI' 
                        AND fPort=25 ORDER BY RowNum DESC";
            }
            //$sql = "SELECT readingTime, consumption FROM SmartMeterReadings WHERE devEUI = '$deviceEUI'";
            // $sql = "SELECT TOP (30)
            //         CONVERT(VARCHAR(20), CONVERT(DATE, readingTime), 107) as readingTime, consumption,
            //         ROW_NUMBER() OVER (ORDER BY id DESC) as RowNum
            //         FROM SmartMeterReadings WHERE devEUI='$deviceEUI'
            //         ORDER BY RowNum DESC";
                    
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $count = $stmt->rowCount();
            if ($count == 0) {
                $arrayMessage = array('status' => 'No reading found');
                return $arrayMessage;
            } else {
                return $result;
            }
        }
    }