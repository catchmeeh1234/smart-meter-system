import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ConcessionairesService } from './concessionaires.service';
import { NotificationsService } from './notifications.service';
import { RatescheduleService } from './rateschedule.service';
import { SessionStorageService } from './session-storage.service';
import { SmartmeterService } from './smartmeter.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket: any;
  public status_message: string;
  public weatherInfo:any = {
    City: null,
    Country: null,
    Temperature: null
  };

  constructor(
    private notif:NotificationsService,
    private sessionStorageService:SessionStorageService,
    private concessionaire:ConcessionairesService,
    private smartmeter:SmartmeterService,
    private rate:RatescheduleService,
  ) {
    this.status_message = "";

  }
  openSocket() {
    this.socket = io('https://backend.smartmetersystem.home:4301', {
      //transports: ['websocket'],
      rejectUnauthorized: false
    });
  }

  logUserToServer() {
    this.socket.on('connect', () => {
      console.log('Connected to server');

      // send data to server on connection
      this.socket.emit('userData', { message: this.sessionStorageService.getSession('username') });
    });
  }

  disconnectSocket() {
    this.socket.on('disconnect', () => {
      let now = new Date();

      console.log(`Socket.IO connection closed. Time: ${now}`);
    });
  }

  closeSocket() {
    if (this.socket !== undefined && this.socket !== null) {
      this.socket.disconnect();
    }
  }

  showDesktopNotification() {
    this.closeSocket();
    this.openSocket();
    this.logUserToServer();
    this.socket.on('message', () => {
      let now = new Date();

      console.log(`Socket.IO connection established Time: ${now}`);
    });

    this.socket.on('message', (data: any) => {
      //this.messages.push(data);
      //let parsedJSON = JSON.parse(data);
      // this.notif.notificationCounter = parsedJSON.length;
      // this.notif.notificationContent = parsedJSON;
      // for (const result of parsedJSON) {
      //   console.log(result.length);
      // }
      // let notificationDetails = {
      //   title: 'Account Update',
      //   message: `${this.status_message} has been updated by ${this.sessionStorageService.getSession('username')}`
      // };
      const pathToIcon = './assets/bell.png';
      if (Notification.permission === 'granted') {
        this.notif.createDesktopNotification(data, pathToIcon);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            this.notif.createDesktopNotification(data, pathToIcon);
          }
        });
      }
    });

    this.socket.on('notifications', (data: any) => {
      let result:any = JSON.parse(data);
      this.notif.notificationContent = result;
    });

    this.socket.on('updateCustomers', (data: any) => {
      let result:any = JSON.parse(data);
      if (this.concessionaire.dataSource !== undefined && this.concessionaire.dataSource !== null) {
        this.concessionaire.dataSource.data = result;
      }
    });

    this.socket.on('updateSmartMeters', (data: any) => {
      let result:any = JSON.parse(data);

      if (this.smartmeter.dataSource !== undefined && this.smartmeter.dataSource !== null) {
        this.smartmeter.dataSource.data = result;
      }
    });

    this.socket.on('broadcastWeatherInformation', (data: any) => {
      let result:any = JSON.parse(data);
      this.weatherInfo.City = result[0].city;
      this.weatherInfo.Country = result[0].country;
      this.weatherInfo.Temperature = result[0].temperature;
      console.log(this.weatherInfo);
    });

    this.socket.on('updateWaterRates', (data: any) => {
      let result:any = JSON.parse(data);
      if (this.rate.dataSource !== undefined && this.rate.dataSource !== null) {
        this.rate.dataSource.data = result;
      }
    });

    this.disconnectSocket();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  sendNotif(message) {
    return this.socket.emit('message', message);
  }

  updateNotification() {
    const query = "SELECT * FROM notifications ORDER BY notif_id DESC";
    return this.socket.emit('notifications', query);
  }

  updateWaterRates() {
    const query = "SELECT * FROM RateSchedules ORDER BY RateSchedulesID DESC";
    return this.socket.emit('updateWaterRates', query);
  }

  updateCustomers() {
    const query = "SELECT Lastname, Firstname, AccountNo, ContactNo, CustomerStatus, LastMeterReading, Zone FROM Customers";
    return this.socket.emit('updateCustomers', query);
  }

  updateSmartMeters() {
    const query = "SELECT * FROM SmartMeters ORDER BY id DESC";
    return this.socket.emit('updateSmartMeters', query);
  }

  broadcastWeatherInformation() {
    const query = "SELECT * FROM WeatherInformation";
    return this.socket.emit('broadcastWeatherInformation', query);
  }
}
