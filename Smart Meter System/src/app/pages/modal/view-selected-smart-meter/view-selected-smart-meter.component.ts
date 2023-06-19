import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationsService } from '../../../services/notifications.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { SmartmeterService } from '../../../services/smartmeter.service';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'app-view-selected-smart-meter',
  templateUrl: './view-selected-smart-meter.component.html',
  styleUrls: ['./../modal.style.scss']
})
export class ViewSelectedSmartMeterComponent implements OnInit {
  public submitForm:FormGroup;
  public isButtonDisabled:boolean = true;
  public toggleUpdateButton: string = "Update Smart Meter";
  public statusColor:string = 'statusSuccess';
  public statusMessage:any;

  public role:string = this.sessionStorageService.getSession("role");

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private smartmeter: SmartmeterService,
    private notif: NotificationsService,
    private websock:WebSocketService,
    private sessionStorageService: SessionStorageService,
    private dialogRef:MatDialogRef<ViewSelectedSmartMeterComponent>,
  ) { }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      devicename: new FormControl(this.data.details[0].device_name, Validators.required),
      devicedeveui: new FormControl(this.data.details[0].device_deveui, Validators.required),
      gatewayid: new FormControl(this.data.details[0].gateway_id, Validators.required),
      reading: new FormControl(this.data.details[0].reading, Validators.required),
    });

    this.submitForm.disable();
  }

  onSubmitForm() {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['statusSuccess']
    };
    if (this.submitForm.valid === true) {
      let params = new FormData();
      const { devicename, devicedeveui, gatewayid, reading } = this.submitForm.value;

      params.append('devicename', devicename);
      params.append('devicedeveui', devicedeveui);
      params.append('gatewayid', gatewayid);
      params.append('reading', reading);
      params.append('id', this.data.details[0].id);

      this.smartmeter.editSmartMeter(params)
      .subscribe(data => {
        let result:any = data;

        let title = 'Smart Meter Update';
        let message = `Smart Meter ${this.data.details[0].device_name} has been updated by ${this.sessionStorageService.getSession('username')}`;

        if (result.status === "Smart Meter Updated Successfully") {
          this.notif.insertNotification(title, message).subscribe(data => {
            this.websock.status_message = this.data.details[0].device_name;
          });

          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
          this.websock.sendNotif(message);
          this.websock.updateSmartMeters();
          this.websock.updateNotification();
        } else {
          this.statusColor = 'statusFailed';
          this.statusMessage = {status: "Please fill up necessary details"};

          config.panelClass = [this.statusColor];
          this.snackBar.open('Please fill up necessary details', 'Close', config);
        }
      });

    } else {
      this.statusColor = 'statusFailed';
      this.statusMessage = {status: "Please fill up necessary details"};
      config.panelClass = [this.statusColor];
      this.snackBar.open('Please fill up necessary details', 'Close', config);
    }
  }

  enableForm() {
    let btnUpdateInformation = document.getElementById("btnUpdateInformation");
    this.submitForm.enable();
    this.toggleUpdateButton = 'Cancel Update Smart Meter';
    this.isButtonDisabled = false;
    btnUpdateInformation.style.opacity  = "1";
    btnUpdateInformation.style.cursor = "pointer";
  }

  disableForm() {
    let btnUpdateInformation = document.getElementById("btnUpdateInformation");
    this.submitForm.disable();
    this.toggleUpdateButton = 'Update Smart Meter';
    this.isButtonDisabled = true;
    btnUpdateInformation.style.opacity  = "0.6";
    btnUpdateInformation.style.cursor = "not-allowed";
  }

  onToggleUpdateBtn() {
    const isFormGroupEnabled = !this.submitForm.disabled;

    if (isFormGroupEnabled) {
      this.disableForm();

    } else {
      this.enableForm();
    }
  }
}
