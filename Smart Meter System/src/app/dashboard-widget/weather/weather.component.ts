import { Component, OnInit } from '@angular/core';
import { WeatherInformationService } from '../../services/weather-information.service';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'cdk-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public city:string;
  public country:string;
  public temperature;


  constructor(private weather:WeatherInformationService, public websock:WebSocketService) { }

  ngOnInit() {
    this.weather.displayWeather()
    .subscribe(res => {
      let result:any = res;
      this.websock.weatherInfo.City = result[0].city;
      this.websock.weatherInfo.Country = result[0].country;
      this.websock.weatherInfo.Temperature = result[0].temperature;
    });
  }

}
