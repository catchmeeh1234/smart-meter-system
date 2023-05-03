import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RatescheduleService } from '../../services/rateschedule.service';
import { WebSocketService } from '../../services/web-socket.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationsService } from '../../services/notifications.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-view-rates',
  templateUrl: './view-rates.component.html',
  styleUrls: ['./view-rates.component.scss']
})
export class ViewRatesComponent implements OnInit {
  public dataSource:any;
  public displayedColumns = ['CustomerType', 'MeterSize', 'MinimumCharge', 'twenty', 'thirty', 'forty', 'fifty', 'maxx', 'action'];
  public response:any;
  public result:any;
  public isInputDisabled:boolean = true;
  public editAction = "Edit";


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    public rate:RatescheduleService,
    private websock: WebSocketService,
    public snackBar:MatSnackBar,
    private notif:NotificationsService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.onDisplayRateSchedules();
  }

  async onDisplayRateSchedules() {
    try {
      await this.rate.getWaterRates().toPromise().then(data => {
        this.result = data;
      });
    } catch (error) {
      console.error(error);
    }
    this.rate.dataSource = new MatTableDataSource(this.result);
    this.rate.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rate.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleInputsOff(rateid) {
    let inputs = document.querySelectorAll(`.class${rateid}`);
    let btn = document.querySelector<HTMLButtonElement>(`#btn${rateid}`);
    let btnSave = document.querySelector<HTMLButtonElement>('.btnSave');

    inputs.forEach((input: HTMLInputElement) => {
      input.disabled = true;
      input.style.color = "#000000de";
      input.style.fontWeight = "normal";
    });
    btn.value = "Edit";
    btn.innerHTML = "Edit";

    btnSave.disabled = true;
    btnSave.value = "";

    this.websock.updateWaterRates();

  }

  toggleInputsOn(rateid) {
    let inputs = document.querySelectorAll(`.class${rateid}`);
    let btn = document.querySelector<HTMLButtonElement>(`#btn${rateid}`);
    let btnSave = document.querySelector<HTMLButtonElement>('.btnSave');

    inputs.forEach((input: HTMLInputElement) => {
      input.disabled = false;
      input.style.color = "green";
      input.style.fontWeight = "bolder";
      input.style.width = `${input.value.length * 10}px`;
    });
    btn.value = "Cancel";
    btn.innerHTML = "Cancel";

    btnSave.disabled = false;
    btnSave.value = rateid;

  }

  editWaterRates(rateid) {
    let btn = document.querySelector<HTMLButtonElement>(`#btn${rateid}`);

    if (btn.value === "Edit") {
      this.toggleInputsOn(rateid);
    } else {
      this.toggleInputsOff(rateid);

    }
  }

  onSaveWaterRates() {
    let statusColor = "statusSuccess";
    let objectHolder:any = {};

    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [statusColor]
    };

    let btnSave = document.querySelector<HTMLButtonElement>('.btnSave');
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.class${btnSave.value}`);

    let keyHolder:any = [
      'CustomerType',
      'MeterSize',
      'MinimumCharge',
      'ElevenToTwenty',
      'TwentyOneToThirty',
      'ThirtyOneToForty',
      'FortyOneToFifty',
      'FiftyOneAndUp',
    ];

    for (const [index, input] of Array.from(inputs).entries()) {
      objectHolder[keyHolder[index]] = input.value;
    }
    objectHolder.RateSchedulesID = btnSave.value;

    this.rate.editWaterRates(objectHolder)
    .subscribe(data => {
      console.log(data);
      let result:any = data;
      if (result.status === "Water Rate Updated Successfully") {
        let title = 'Water Rate Updated';
        let message = `RateScheduleID: ${objectHolder.RateSchedulesID} has been updated by ${this.sessionStorageService.getSession('username')}`;

        this.notif.insertNotification(title, message).subscribe(data => {
          //this.websock.status_message = devicedeveui;
        });

        this.websock.sendNotif(message);
        this.websock.updateNotification();
      } else {
        console.log('error updating an water rate: ' + result.status);
        statusColor = 'statusFailed';
        config.panelClass = [statusColor];
        this.snackBar.open('error adding an account', 'Close', config);
      }

    });

    this.toggleInputsOff(btnSave.value);

  }
}
