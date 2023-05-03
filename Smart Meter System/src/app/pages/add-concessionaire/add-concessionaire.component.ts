import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';
import { RatescheduleService } from '../../services/rateschedule.service';
import { MetersizeService } from '../../services/metersize.service';
import { ConcessionairesService } from '../../services/concessionaires.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { WebSocketService } from '../../services/web-socket.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-add-concessionaire',
  templateUrl: './add-concessionaire.component.html',
  styleUrls: ['./../modal/modal.style.scss']
})
export class AddConcessionaireComponent implements OnInit {
  public submitForm: FormGroup;

  public accno:string;
  public zones:any;
  public rates:any;
  public metersizes:any;
  public isButtonDisabled:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zone:ZoneService,
    private rate: RatescheduleService,
    private metersize: MetersizeService,
    private concessionaire: ConcessionairesService,
    private sessionStorageService: SessionStorageService,
    private dialogRef: MatDialogRef<AddConcessionaireComponent>,
    public snackBar: MatSnackBar,
    private websock:WebSocketService,
    private notif: NotificationsService
    ) { }

  ngOnInit(): void {
    this.onDisplayZones();
    this.onDisplayRates();
    this.onDisplayMeterSizes();

    this.submitForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      companyname: new FormControl(null),
      serviceaddress: new FormControl(null, Validators.required),
      landmark: new FormControl(null),
      contactno: new FormControl(null),
      readingseqno: new FormControl(null, Validators.required),
      zone: new FormControl('Del Pilar', Validators.required),
      rates: new FormControl('Residential', Validators.required),
      metersize: new FormControl('1/2"', Validators.required),
      datecreated: new FormControl(this.getCurrentDate(), Validators.required),
      dateinstalled: new FormControl(this.getCurrentDate(), Validators.required),
      customerstatus: new FormControl('Closed', Validators.required),
      meterno: new FormControl(null),
    });

    this.generateAccountNo();
  }


  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  onDisplayZoneDetails() {
    this.zone.getZones()
    .subscribe(data => {

    });
  }

  generateAccountNo() {
    const { zone, rates } = this.submitForm.value;

    this.zone.getZones().subscribe(data => {
      let result:any = data;
      this.rate.getCustomerType().subscribe(res => {
        let response:any = res;
          for (const rate of response) {
            for (const zoneName of result) {
              if (zone === zoneName.ZoneName && rates === rate.Type) {
                let last_number = zoneName.LastNumber.toString().padStart(5, '0');
                let zoneid = zoneName.ZoneID.toString().padStart(2, '0');

                this.accno = `${zoneid}-${last_number}-${rate.CustomerTypeID}`;
              }
            }
          }
      });
    });

    this.submitForm.valueChanges.subscribe(formdata => {
      this.zone.getZones().subscribe(data => {
        let result:any = data;
        this.rate.getCustomerType().subscribe(res => {
          let response:any = res;
          for (const rate of response) {
            for (const zone of result) {
              if (formdata.zone === zone.ZoneName && formdata.rates === rate.Type) {
                let last_number = zone.LastNumber.toString().padStart(5, '0');
                let zoneid = zone.ZoneID.toString().padStart(2, '0');

                this.accno = `${zoneid}-${last_number}-${rate.CustomerTypeID}`;
              }
            }
          }
        });
      });
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
      const {firstname, lastname, companyname, serviceaddress, landmark, contactno, readingseqno, zone, rates, metersize, datecreated, dateinstalled, customerstatus, meterno} = this.submitForm.value;

      params.append('firstname', firstname);
      params.append('lastname', lastname);
      params.append('companyname', companyname);
      params.append('serviceaddress', serviceaddress);
      params.append('landmark', landmark);
      params.append('contactno', contactno);
      params.append('readingseqno', readingseqno);
      params.append('zone', zone);
      params.append('rates', rates);
      params.append('metersize', metersize);
      params.append('datecreated', datecreated);
      params.append('dateinstalled', dateinstalled);
      params.append('customerstatus', customerstatus);
      params.append('accno', this.accno);
      params.append('username', this.sessionStorageService.getSession('username'));
      params.append('meterno', meterno);

      this.concessionaire.addConcessionaireAccount(params)
      .subscribe(data => {
        let result:any = data;
        if (result.status === "Account Added Successfully") {
          let title = 'New Account';
          let message = `${this.accno} has been added by ${this.sessionStorageService.getSession('username')}`;

          this.notif.insertNotification(title, message).subscribe(data => {
            this.websock.status_message = this.accno;
          });

          this.websock.sendNotif(message);
          this.websock.updateCustomers();
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
      });
     } else {
        statusColor = 'statusFailed';
        config.panelClass = [statusColor];
        this.snackBar.open('Please fill up necessary details', 'Close', config);
     }
  }

  onDisplayZones() {
    this.zone.getZones()
    .subscribe(res => {
      this.zones = res;
    });
  }

  onDisplayRates() {
    this.rate.getRateSchedules()
    .subscribe(res => {
      this.rates = res;
    });
  }

  onDisplayMeterSizes() {
    this.metersize.getMeterSizes()
    .subscribe(res => {
      this.metersizes = res;
    });
  }
}
