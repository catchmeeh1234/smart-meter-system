<?php
    header('Access-Control-Allow-Origin: *');
    
    class User extends Connect {
        private $username;
        private $password;

        public function __construct()
        {
            
        }

        public function login($username, $password) {
            $this->username = $username;
            $this->password = $password;

            $connection = $this->openConnection();

            //PDO query
            $sql = "SELECT * FROM UserAccounts WHERE username = ? AND password = ?";
            $rowAuthLogin = $connection->prepare($sql);
            $rowAuthLogin->execute([$this->username, $this->password]);
            $users = $rowAuthLogin->fetchAll();

            $count = $rowAuthLogin->rowCount();
            if ($count == 0) {
                $arrayAuthLogin = array('status' => 'Invalid Credentials');
                return json_encode($arrayAuthLogin);
        
            } else {
                session_start();
                $_SESSION['username'] = $this->username;
        
                foreach ($users as $user) {
                    $_SESSION['id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                }
        
                $arrayAuthLogin = array('uid' => $_SESSION['id'], 'username' =>  $_SESSION['username'], 'status' => 'Login Success');

                return json_encode($arrayAuthLogin);
            }
        } 
    }

  