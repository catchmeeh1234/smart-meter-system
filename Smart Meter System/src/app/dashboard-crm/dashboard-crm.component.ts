import { Component, OnInit } from '@angular/core';
import { ConcessionairesService } from '../services/concessionaires.service';
import { ZoneService } from '../services/zone.service';
import { WeatherInformationService } from '../services/weather-information.service';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

    public activeConcessionaires:number = 0;
    public disconnectedConcessionaires:number = 0;
    public totalConcessionaires:number = 0;

    // public dashCard = [
    //     { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 1221, title: 'Total concessionaires', icon: 'people' },
    //     { colorDark: '#42A5F5', colorLight: '#64B5F6', number: 1221, title: 'LEADS', icon: 'new_releases' },
    //     { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 1221, title: 'ASSETS', icon: 'assignments' },
    //     { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'BANKING', icon: 'account_balance' }
    // ];

    public dashCard:any;

    tableData = [
        { country: 'India', sales: 5400, percentage: '40%' },
        { country: 'Us', sales: 3200, percentage: '30.33%' },
        { country: 'Australia', sales: 2233, percentage: '18.056%' },
        { country: 'Spaim', sales: 600, percentage: '6%' },
        { country: 'China', sales: 200, percentage: '4.50%' },
        { country: 'Brazil', sales: 100, percentage: '2.50%' },
    ];

    constructor(private concessionaire:ConcessionairesService, private zone:ZoneService, private weather:WeatherInformationService) {
      this.dashCard = [];
      this.zone.zoneCountArray = [];
    }

    ngOnInit() {

      this.concessionaire.displayAllConcessionaires().subscribe(res => {
        let result:any;
        result = res;

        this.zone.getZones().subscribe(_zones => {
          let zones:any = _zones;
          let top3Zones = [];
          for (const zone of zones) {
            let counter = 0;

            for (const concessionaire of result) {
              if (zone.ZoneName.toLowerCase() === concessionaire.Zone.toLowerCase()) {
                counter++;
              }

            }
            let objectHolder = {zoneName: zone.ZoneName, count: counter};
            this.zone.zoneCountArray.push(objectHolder);
            top3Zones.push(objectHolder);

          }
          top3Zones.sort((a, b) => b.count - a.count); // Sort the array in descending order
          const largestZones = top3Zones.slice(0, 3); // Get the first three elements

          for (const i of largestZones) {
            let obj = { colorDark: '#66BB6A', colorLight: '#81C784', number: i.count, title: i.zoneName, icon: 'account_balance' };
            this.dashCard.push(obj);
          }
        });

      });

      // let sample = { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'BANKING', icon: 'account_balance' };
      // this.dashCard.push(sample);
      // console.log(this.dashCard[0]);
      this.concessionaire.displayDisconnectedConcessionaire().subscribe(data => {
        this.disconnectedConcessionaires = parseInt(data);
      });

      this.concessionaire.displayConcessionaireCount().subscribe(data => {
        this.totalConcessionaires = parseInt(data);
        let objectHolder = { colorDark: '#42A5F5', colorLight: '#64B5F6', number: this.totalConcessionaires, title: 'Total Concessionaires', icon: 'people' };
        this.dashCard.push(objectHolder);
      });

      this.concessionaire.displayActiveConcessionaire().subscribe(data => {
        this.activeConcessionaires = parseInt(data);
      });

      this.weather.fetchWeather();


      setInterval(() => {
        this.weather.fetchWeather()
      }, 60000);

    }
}
