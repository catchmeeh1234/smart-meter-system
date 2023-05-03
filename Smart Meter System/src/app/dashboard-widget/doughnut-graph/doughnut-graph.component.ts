import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'cdk-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {

    /**
     * Fake data to display on the pie chart
     */
  public graphData:any;

  constructor(private zone:ZoneService) {
  }

  ngOnInit() {
      setTimeout(() => {
          this.createDoughnutData();
      },500)

  }

  createDoughnutData() {
    this.graphData = [];
    for (const g of this.zone.zoneCountArray) {
      let objectHolder = {name: g.zoneName, value: g.count};
      this.graphData.push(objectHolder);
    }
  }
}
