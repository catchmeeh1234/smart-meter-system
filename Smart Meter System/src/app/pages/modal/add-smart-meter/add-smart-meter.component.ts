import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SmartmeterService } from '../../../services/smartmeter.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-add-smart-meter',
  templateUrl: './add-smart-meter.component.html',
  styleUrls: ['./../modal.style.scss']
})
export class AddSmartMeterComponent implements OnInit {
  public submitForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSmartMeterComponent>,
    private smartmeter: SmartmeterService,
    private websock: WebSocketService,
    private sessionStorageService: SessionStorageService,
    private notif: NotificationsService
  ) { }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      devicename: new FormControl(null, Validators.required),
      devicedeveui: new FormControl(null, Validators.required),
      gatewayid: new FormControl(null, Validators.required),
      reading: new FormControl(null, Validators.required),
    });
  }

  onSubmitForm() {
    let statusColor = 'statusSuccess';
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [statusColor]
    };

    if (this.submitForm.valid === true) {
      let params = new FormData();
      const {devicename, devicedeveui, gatewayid, reading} = this.submitForm.value;

      params.append('devicename', devicename);
      params.append('devicedeveui', devicedeveui);
      params.append('gatewayid', gatewayid);
      params.append('reading', reading);

      this.smartmeter.addSmartMeter(params)
      .subscribe(data => {
        let result:any = data;
        if (result.status === "Smart Meter Added Successfully") {
          let title = 'New Smart Meter';
          let message = `Smart Meter ${devicedeveui} has been added by ${this.sessionStorageService.getSession('username')}`;

          this.notif.insertNotification(title, message).subscribe(data => {
            //this.websock.status_message = devicedeveui;
          });

          this.websock.sendNotif(message);
          this.websock.updateSmartMeters();
          this.websock.updateNotification();

          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
        } else {
          console.log('error adding an account: ' + result.status);
          statusColor = 'statusFailed';
          config.panelClass = [statusColor];
          this.snackBar.open('error adding an account', 'Close', config);
        }
        console.log(data);
      });
    } else {
      statusColor = 'statusFailed';
      config.panelClass = [statusColor];
      this.snackBar.open('Please fill up necessary details', 'Close', config);
    }
  }
}
