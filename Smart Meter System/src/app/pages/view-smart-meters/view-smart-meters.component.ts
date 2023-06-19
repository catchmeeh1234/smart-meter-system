import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SmartmeterService } from '../../services/smartmeter.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSmartMeterComponent } from '../modal/add-smart-meter/add-smart-meter.component';
import { ViewSelectedSmartMeterComponent } from '../modal/view-selected-smart-meter/view-selected-smart-meter.component';
import { BindWaterMeterComponent } from '../modal/bind-water-meter/bind-water-meter.component';
import { ConcessionairesService } from '../../services/concessionaires.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-view-smart-meters',
  templateUrl: './view-smart-meters.component.html',
  styleUrls: ['./view-smart-meters.component.scss']
})
export class ViewSmartMetersComponent implements OnInit {
  //public dataSource:any;
  public displayedColumns = ['DeviceName', 'DevEUI', 'GatewayID', 'Frequency', 'Reading', 'Action'];
  public result:any;
  private statusColor:string;

  public role:string = this.sessionStorageService.getSession("role");

  constructor(
    public smartmeter:SmartmeterService,
    private dialog: MatDialog,
    private concessionaire: ConcessionairesService,
    private snackBar: MatSnackBar,
    private sessionStorageService:SessionStorageService
  ) { }

  ngOnInit(): void {
    this.onDisplaySmartMeters();
  }

  onDisplaySmartMeters() {
    this.smartmeter.getSmartMeters()
    .subscribe(res => {
      this.result = res;
      this.smartmeter.dataSource = new MatTableDataSource(this.result);
      // this.concessionaire.dataSource.paginator = this.paginator;
      // this.dataSource = res;
    });
  }

  onBindSmartMeter(deveui) {
    if (deveui === "" || deveui === null || deveui === undefined) {
      return;
    }

    const dialogRef = this.dialog.open(BindWaterMeterComponent, {
      panelClass: ['no-padding'],
      data: {
        headerText: 'Bind Smart Meter',
        device_eui: deveui
      }
    });

  }

  onUnbindSmartMeter(deveui) {
    if (deveui === "" || deveui === null || deveui === undefined) {
      return;
    }

    let params = new FormData();
    params.append('DeviceEUI', deveui);

    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['statusSuccess']
    };

    this.concessionaire.unbindSmartMeter(params)
    .subscribe(data => {
      console.log(data);
      let result:any = data;
      if (result.status === `Smart Meter ${deveui} unbinded successfully`) {
        this.statusColor = 'statusSuccess';
      } else {
        this.statusColor = 'statusFailed';
      }
      config.panelClass = [this.statusColor];
      this.snackBar.open(result.status, 'Close', config);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.smartmeter.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenAddSmartMeter() {
    const dialogRef = this.dialog.open(AddSmartMeterComponent, {
      panelClass: ['no-padding'],
      data: {
        headerText: 'Create New Smart Meter'
      }
    });
  }

  openSmartMeterDetails(deveui) {
    this.smartmeter.selectSmartMeter(deveui)
    .subscribe(data => {
      let result:any = data;

      const dialogRef = this.dialog.open(ViewSelectedSmartMeterComponent, {
        panelClass: ['no-padding'],
        data: {
          details: result,
          headerText: 'Smart Meter'
        }
      });
    });
  }

}
