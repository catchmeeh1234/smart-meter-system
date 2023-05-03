import { Injectable } from '@angular/core';
import { OPENWEATHERMAP_API_KEY, API_URL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherInformationService {
  public coords:any;


  constructor(private http:HttpClient, private websock:WebSocketService) {

  }

  fetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentMinute === 49) {
          for (let index = 1; index <= 24; index++) {
            if(currentHour === index) {
              //const {latitude, longitude} = this.getLocation()
              fetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=a59a70fd1ef850e8555bcaed01054d5e`)
              .then(response => response.json())
              .then(data => {
                let result:any = data;
                let objectHolder = { city: result.name, country: result.sys.country, temperature: result.main.temp };
                this.updateWeather(objectHolder);

                this.displayWeather();
                this.websock.broadcastWeatherInformation();
              });
            }
          }
         }

      });
    }
  }

  updateWeather(weatherDetails:any) {
    this.http.get(`${API_URL}/updateWeatherInformation.php?city=${weatherDetails.city}&country=${weatherDetails.country}&temperature=${weatherDetails.temperature}`, {responseType: 'text'})
    .subscribe(res => {
      console.log(res);
    });
  }

  displayWeather() {
    return this.http.get(`${API_URL}/viewWeatherStatus.php`, {responseType: 'json'});
  }
}
