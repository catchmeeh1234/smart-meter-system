import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConcessionairesService } from './concessionaires.service';
import { API_URL } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public notificationCounter: number = 0;
  public notificationContent:any = [];

  constructor(private concessionaire:ConcessionairesService, private http:HttpClient) {
  }

  viewNotifications() {
    return this.http.get(`${API_URL}/viewNotifications.php`, {responseType: 'json'});
  }

  insertNotification(title:string, message:string) {
    let params = new FormData();
    params.append('title', title);
    params.append('message', message);

    return this.http.post(`${API_URL}/addNotification.php`, params, {responseType: 'json'});
  }

  createDesktopNotification(message, icon) {
    const options = {
      body: message,
      icon: icon
    };
    const notification = new Notification('New Message', options );
    notification.onclick = function() {
      console.log('test');
      window.open("https://srwd.smartmetersystem.home/");
      notification.close();
    };
  }
}
