import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SmartmeterService {
  public dataSource:any;

  constructor(private http:HttpClient) { }

  getSmartMeters() {
    return this.http.get(`${API_URL}/viewSmartMeters.php`, {responseType: 'json'});
  }

  readSmartMeter(accno) {
    return this.http.get(`${API_URL}/readSmartMeter.php?accno=${accno}`, {responseType: 'json'});
  }

  viewConsumptionPattern(deveui, timeline) {
    return this.http.get(`${API_URL}/chirpstack/viewConsumptionPattern.php?deveui=${deveui}&timeline=${timeline}`, {responseType: 'json'});
  }

  getLastReading(deveui) {
    return this.http.get(`${API_URL}/chirpstack/getLastReading.php?deveui=${deveui}`);
  }

  addSmartMeter(smartmeterdetails:any) {
    return this.http.post(`${API_URL}/addSmartMeter.php`, smartmeterdetails, { responseType: 'json' });
  }

  selectSmartMeter(deveui) {
    return this.http.get(`${API_URL}/selectSmartMeter.php?deveui=${deveui}`);
  }

  editSmartMeter(smartmeterdetails:any) {
    return this.http.post(`${API_URL}/editSmartMeter.php`, smartmeterdetails, {responseType: 'json'});
  }
}
