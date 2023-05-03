import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RatescheduleService {
  public dataSource:any

  constructor(private http:HttpClient) { }

  getRateSchedules() {
    return this.http.get(`${API_URL}/viewRateSchedules.php`, {responseType: 'json'});
  }

  getWaterRates() {
    return this.http.get(`${API_URL}/viewWaterRates.php`, {responseType: 'json'});
  }

  getCustomerType() {
    return this.http.get(`${API_URL}/viewCustomerType.php`, {responseType: 'json'});
  }

  editWaterRates(waterRateDetails:any) {
    return this.http.post(`${API_URL}/editWaterRates.php`, waterRateDetails, {responseType: 'json'});
  }
}
