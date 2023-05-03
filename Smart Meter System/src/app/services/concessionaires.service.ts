import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class ConcessionairesService {
  public dataSource:any;
  public result:any;

  constructor(private http:HttpClient) { }

  displayConcessionaires(zonename:string) {
    this.fetchConcessionaires(zonename)
    .subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(this.result);

    });
  }
  fetchConcessionaires(zonename:string) {
    return this.http.get(`${API_URL}/viewConcessionaires.php?ZoneName=${zonename}`,{responseType: 'json'});
  }

  selectConcessionaire(accno) {
    return this.http.get(`${API_URL}/selectConcessionaire.php?accno=${accno}`,{responseType: 'json'});
  }

  selectWaterMeter(meterno) {
    return this.http.get(`${API_URL}/selectWaterMeter.php?meterno=${meterno}`,{responseType: 'json'});
  }

  displayConcessionaireCount() {
    return this.http.get(`${API_URL}/viewConcessionaireCount.php`,{responseType: 'text'});
  }

  displayActiveConcessionaire() {
    return this.http.get(`${API_URL}/viewActiveConcessionaire.php`,{responseType: 'text'});
  }

  displayDisconnectedConcessionaire() {
    return this.http.get(`${API_URL}/viewDisconnectedConcessionaire.php`,{responseType: 'text'});
  }

  displayAllConcessionaires() {
    return this.http.get(`${API_URL}/viewAllConcessionaires.php`,{responseType: 'json'});
  }

  addUserAccount(fname:string, lname:string, uname:string, pwd:string, role:string) {
    return this.http.get(`${API_URL}/addUserAccount.php?firstname=${fname}&lastname=${lname}&username=${uname}&password=${pwd}&role=${role}`,{responseType: 'json'});
  }

  editConcessionaireAccount(accountDetails:any) {
    return this.http.post(`${API_URL}/editConcessionaireAccount.php`, accountDetails, {responseType: 'json'});
  }

  addConcessionaireAccount(accountDetails:any) {
    return this.http.post(`${API_URL}/addConcessionaireAccount.php`, accountDetails, {responseType: 'json'});
  }

  bindSmartMeter(accountDetails:any) {
    return this.http.post(`${API_URL}/bindSmartMeter.php`, accountDetails, {responseType: 'json'});
  }

  unbindSmartMeter(accountDetails:any) {
    return this.http.post(`${API_URL}/unbindSmartMeter.php`, accountDetails, {responseType: 'json'});
  }
}
