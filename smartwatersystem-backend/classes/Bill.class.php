<?php
    header('Access-Control-Allow-Origin: *');
    
    class Bill extends Connect
    {
        public function getBills($zonename, $billingmonth) {
                $connection = $this->openConnection();
                $sql = "SELECT BILLID, BillNo,AccountNumber,CustomerName,CustomerAddress,ReadingDate,DueDate,
                PreviousReading,Reading,Consumption,Bills.RateSchedule,Bills.MeterSize,Bills.Zone,AmountDue,
                PenaltyAfterDue,MeterNo,ReadingSeqNo,LasReadingDate,Customers.IsSenior,BillingDate,
                IsPaid,BillStatus,MeterReader,Bills.AverageCons,Bills.AdvancePayment,ArrearsBill,ArrearsCharges 
                FROM Bills, Customers WHERE Bills.BillingDate='$billingmonth' AND Bills.Zone='$zonename' AND
                Bills.IsPaid = 'No'AND Bills.Cancelled = 'No' AND Bills.BillStatus = 'Pending' 
                AND Bills.Reading = 0 AND Customers.AccountNo = Bills.AccountNumber";

                $stmt = $connection->prepare($sql);
                $stmt->execute();
                $result = $stmt->fetchAll();
                $count = $stmt->rowCount();
                if ($count == 0) {
                    $arrayMessage = array('status' => 'No Bills found');
                    //echo json_encode($arrayDocuments);
                    return $arrayMessage;
                } else {
                    // foreach($documents as $document) {
                    //     echo $document['document_id'] . "<br>";
                    // }
                    //print_r(json_encode($concessionaires));
                    return $result;
                }
        }

        public function getLastReadingFromBill($billno) {
            $connection = $this->openConnection();
            $sql = "SELECT * FROM Bills WHERE BillNo='$billno'";
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $count = $stmt->rowCount();
            if ($count == 0) {
                $arrayMessage = array('status' => 'No Bills found');
                //echo json_encode($arrayDocuments);
                return "No reading found";
            } else {
                foreach($result as $reading) {
                    return $reading['PreviousReading'];
                }
            }

        }

        public function computeBill($currentconsumption, $classification, $metersize, $isSenior, $arrearsBills, $arrearsCharges, $penaltyAfterDue, $advancePayment, $billAdjustment) {
            $amountdue = 0.00;
            $discount = 0.00;
            $seniordiscountlimit = 0.00;
            $seniordiscountpercent = 0.00;
            $totalamountdue = 0.00;

            $connection = $this->openConnection();
            $sql = "SELECT * FROM RateSchedules WHERE CustomerType='$classification' AND MeterSize='$metersize'";
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();

            //get senior citizen discount
            $getSeniorDiscount = "SELECT * FROM Discounts WHERE DiscountName='Senior Citizen'";
            $stmtSeniorDiscount = $connection->prepare($getSeniorDiscount);
            $stmtSeniorDiscount->execute();
            $seniorDiscount = $stmtSeniorDiscount->fetchAll();

            foreach ($seniorDiscount as $seniordisc) {
                $seniordiscountlimit = $seniordisc['DiscountLimit'];
                $seniordiscountpercent = $seniordisc['DiscountPercent'];
            }

            foreach($result as $rate) {

                if ($currentconsumption > 50 ) {
                    $amountdue = $rate['MinimumCharge'] + ($rate['twenty'] * 10) + ($rate['thirty'] * 10) + ($rate['forty'] * 10) + ($rate['fifty'] * 10) + ($rate['maxx']  * ($currentconsumption - 50));
                } else {
                    if ($currentconsumption >= 0 && $currentconsumption <= 10) {
                        $amountdue = $rate['MinimumCharge'];
                    }
                    if ($currentconsumption >= 11 && $currentconsumption <= 20) {
                        $amountdue = $rate['MinimumCharges'] + ($rate['twenty'] * ($currentconsumption - 10));
                    }
                    if ($currentconsumption >= 21 && $currentconsumption <= 30) {
                        $amountdue = $rate['MinimumCharges'] + ($rate['twenty'] * 10) + ($rate['thirty'] * ($currentconsumption - 20));
                    }
                    if ($currentconsumption >= 31 && $currentconsumption <= 40) {
                        $amountdue = $rate['MinimumCharges'] + ($rate['twenty'] * 10) + ($rate['thirty'] * 10) + ($rate['forty'] * ($currentconsumption - 30));
                    }
                    if ($currentconsumption >= 41 && $currentconsumption <= 50) {
                        $amountdue = $rate['MinimumCharges'] + ($rate['twenty'] * 10) + ($rate['thirty'] * 10) + ($rate['forty'] * 10) + ($rate['fifty'] * ($currentconsumption - 40));
                    }
                }

                if ($isSenior == "Yes") {
                    if ($currentconsumption > $seniordiscountlimit) {
                        $discount = 0.00;
                    } else {
                        $discount = $amountdue * $seniordiscountpercent;
                    }
                } else {
                    $discount = 0.00;
                }
                $totalamountdue = ($arrearsBills + $arrearsCharges + $amountdue + $penaltyAfterDue + $billAdjustment) - ($discount - $advancePayment);
                return $totalamountdue;
            }
        }

        public function selectBill($billno) {
            $connection = $this->openConnection();
            $sql = "SELECT * FROM Bills WHERE BillNo='$billno'";
            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            $count = $stmt->rowCount();
            if ($count == 0) {
                $arrayMessage = array('status' => 'No Bills found');
                //echo json_encode($arrayDocuments);
                exit("No reading found");
            } else {
                return $result;
            }
            
        }


        public function updateBill($currentreading, $billno) {
            global $addDaysForDueDate;
            global $addDaysForDisconnection;

            $classification = ""; 
            $metersize = ""; 
            $isSenior = ""; 
            $arrearsBills = 0.00; 
            $arrearsCharges = 0.00; 
            $penaltyAfterDue = 0.00; 
            $advancePayment = 0.00; 
            $billAdjustment = 0.00; 

            $datenow = date("Y-m-d h:i:s A");
            $duedate = date("Y-m-d h:i:s A", strtotime($addDaysForDueDate, strtotime($datenow)));
            $lastdaynopen = $duedate;
            $discdate = date("Y-m-d h:i:s A", strtotime($addDaysForDisconnection, strtotime($datenow)));
            $lastmeterreading = $this->getLastReadingFromBill($billno);

            if ($lastmeterreading == "No reading found") {
                $arrayMessage = array('status' => 'No reading found');
                return $arrayMessage;
            }

            $consumption = $currentreading - $lastmeterreading;

            if ($consumption < 0) {
                $arrayMessage = array('status' => 'Negative value is not allowed');
                return $arrayMessage;
            }

            $selectedBill = $this->selectBill($billno);

            foreach ($selectedBill as $billinfo) {
                $classification = $billinfo['RateSchedule']; 
                $metersize = $billinfo['MeterSize']; 
                $isSenior = $billinfo['isSenior']; 
                $arrearsBills = $billinfo['ArrearsBill']; 
                $arrearsCharges = $billinfo['ArrearsCharges']; 
                $penaltyAfterDue =$billinfo['PenaltyAfterDue']; 
                $advancePayment = $billinfo['AdvancePayment']; 
                $billAdjustment = $billinfo['Adjustment']; 
            }

            $computeBill = $this->computeBill($consumption, $classification, $metersize, $isSenior, $arrearsBills, $arrearsCharges, $penaltyAfterDue, $advancePayment, $billAdjustment);

            $connection = $this->openConnection();
            $sql = "UPDATE Bills SET ReadingDate = :readingdate, DueDate= :duedate, LastDayNOPen = :lastdaynopen, DiscDate = :discdate, Reading = :reading, 
                    Consumption = :consumption, AmountDue = :amountdue WHERE BillNo = :billno";
            $stmt = $connection->prepare($sql);
            $stmt->execute(array(':readingdate' => $datenow, ':duedate' => $duedate,':lastdaynopen' => $lastdaynopen, ':discdate' => $discdate, ':reading' => $currentreading, ':consumption' => $consumption, ':amountdue' => $computeBill, ':billno' => $billno));
            $count = $stmt->rowCount();

            if ($count == 1) {
                $arrayMessage = array('status' => 'Bill read Successfully');
                
            } else {
                print_r($stmt->errorInfo());
                $arrayMessage = array('status' => 'Error reading bill');
            }

            return $arrayMessage;
        }


    }