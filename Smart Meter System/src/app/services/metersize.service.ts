import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MetersizeService {

  constructor(private http:HttpClient) { }

  getMeterSizes() {
    return this.http.get(`${API_URL}/viewMeterSizes.php`, {responseType: 'json'});
  }
}
