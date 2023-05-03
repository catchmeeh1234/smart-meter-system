import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient) { }

  getBills(zonename, BillingMonth) {
    return this.http.get(`${API_URL}/viewBills.php?ZoneName=${zonename}&BillingMonth=${BillingMonth}`, {responseType: 'json'});
  }

  updateBills(reading:any, billno:any) {
    let objectHolder = {
      reading: reading,
      billno: billno
    };
    return this.http.post(`${API_URL}/updateBills.php`, objectHolder, {responseType: 'json'});

  }

}
