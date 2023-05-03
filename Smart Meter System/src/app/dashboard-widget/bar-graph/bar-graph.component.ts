import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'cdk-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  public arrayZones:any;
  public arrayZonesCount:any;

  constructor(private zone:ZoneService) {
    this.arrayZones = [];
    this.arrayZonesCount = [];
   }

  ngOnInit() {
      setTimeout(() => {
          this.createBarGraph();
      },500)
  }

  displayZones() {

    for (const zone of this.zone.zoneCountArray) {
       this.arrayZones.push(zone.zoneName);
       this.arrayZonesCount.push(zone.count);
    }

  }

  createBarGraph() {
      this.displayZones();

      new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels: this.arrayZones,
                datasets: [
                    {
                        backgroundColor: 'rgba(92, 107, 192, .7)',
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: this.arrayZonesCount,
                        label: 'Concessionaire',
                        fill: 'false'
                    }
                    // {
                    //     backgroundColor: 'rgba(66, 165, 245, .7)',
                    //     borderColor: 'rgba(69, 39, 160, .7)',
                    //     data: [80, 88, 67, 95, 76, 60, 67, 95,95,66],
                    //     label: 'Concessionaire',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(38, 166, 154, .7)',
                    //     borderColor: 'rgba(69, 39, 160, .7)',
                    //     data: [60, 88, 70, 67, 27, 83, 78, 88,95,60],
                    //     label: 'Concessionaire',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(102, 187, 106, .7)',
                    //     borderColor: 'rgba(255, 99, 132)',
                    //     data: [75, 55, 55, 95, 66, 88, 70, 78,77,100],
                    //     label: 'Concessionaire',
                    //     fill: 'false'
                    // }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'Concessionaires by Zone'
                }
            }
        })
  }
}
