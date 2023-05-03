import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  public zoneCountArray:any;

  constructor(private http:HttpClient) {
    this.zoneCountArray = [];
  }

  getZones() {
    return this.http.get(`${API_URL}/viewZones.php`, {responseType: 'json'});
  }
}
