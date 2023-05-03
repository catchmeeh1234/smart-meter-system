<?php
    header('Access-Control-Allow-Origin: *');

    class InternalService
    {
    public function getJWT() {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'http://192.168.10.69:8080/api/internal/login');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "{  \n   \"email\": \"admin\",  \n   \"password\": \"admin\"  \n }");

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Accept: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        return $result;
    }
    }