<?php
header('Access-Control-Allow-Origin: *');

class Weather extends Connect
{
   public function setWeatherStatus($city, $country, $temperature) {
        //convert kelvin to celcius
        $temperature = $temperature - 273.15;
        $connection = $this->openConnection();
        $sql = "UPDATE WeatherInformation SET city=:city, country=:country, temperature=:temperature WHERE id = 1";
        $stmt = $connection->prepare($sql);
        $stmt->execute(array(':city' => $city, ':country' => $country,':temperature' => $temperature));
        $concessionaires = $stmt->fetchAll();
        $count = $stmt->rowCount();
        if ($count == 0) {
            //$arrayDocuments = array('status' => 'Update Failed');
            //echo json_encode($arrayDocuments);
            echo "update failed";
        } else {
            // foreach($documents as $document) {
            //     echo $document['document_id'] . "<br>";
            // }
            //print_r(json_encode($concessionaires));
            echo "update success";
        }
   }

   public function getWeatherStatus($id) {
        $connection = $this->openConnection();

        //validate username if already exist
        $sql = "SELECT * FROM WeatherInformation WHERE id = '$id'";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        $count = $stmt->rowCount();

        if ($count == 0) {
            $arrayMessage = array('status' => 'no data found');
            return $arrayMessage;
        } else {
            return $result;
        }
   }
}