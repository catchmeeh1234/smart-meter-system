import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-water-meter',
  templateUrl: './view-water-meter.component.html',
  styleUrls: ['./view-water-meter.component.scss']
})
export class ViewWaterMeterComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onDisplaySmartMeterDetails() {
  }
}
