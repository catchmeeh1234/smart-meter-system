import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConcessionairesService } from '../../../services/concessionaires.service';
import { ViewWaterMeterComponent } from '../view-water-meter/view-water-meter.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../../services/zone.service';
import { RatescheduleService } from '../../../services/rateschedule.service';
import { MetersizeService } from '../../../services/metersize.service';
import { SmartmeterService } from '../../../services/smartmeter.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { WebSocketService } from '../../../services/web-socket.service';
import { NotificationsService } from '../../../services/notifications.service';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-view-concessionaire',
  templateUrl: './view-concessionaire.component.html',
  styleUrls: ['./view-concessionaire.component.scss']
})
export class ViewConcessionaireComponent implements OnInit {
  public meterDetails:any;
  public editForm: FormGroup;
  public toggleUpdateButton:string = "Update Concessionaire";
  public isButtonDisabled:boolean = true;
  public statusMessage:any;
  public statusColor:string;
  public result:any;
  public zones:any;
  public rates:any;
  public metersizes:any;
  public submitBgColor:string = "red";
  public currentDate = new Date().toLocaleDateString();

  public view: any[] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Years";
  public showYAxisLabel = true;
  public yAxisLabel: "Salary";
  public graphDataChart: any[];
  public selectedTimeline:string = "Daily";
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  public lastMeterReadingInM3 = [
    {
      name: 'Last Meter Reading',
      value: null
    }
  ];

  public role:string = this.sessionStorageService.getSession("role");
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private concessionaire:ConcessionairesService,
              public dialog: MatDialog,
              private dialogRef:MatDialogRef<ViewConcessionaireComponent>,
              private zone:ZoneService,
              private rate:RatescheduleService,
              private metersize:MetersizeService,
              private smartmeter:SmartmeterService,
              public snackBar: MatSnackBar,
              private websock: WebSocketService,
              private notif:NotificationsService,
              private sessionStorageService: SessionStorageService
  ) {
    this.statusMessage = "";
  }

  ngOnInit(): void {

    this.onDisplayZones();
    this.onDisplayRates();
    this.onDisplayMeterSizes();

    if(this.data.details[0].reading === null || this.data.details[0].reading === undefined) {
      this.lastMeterReadingInM3[0].value = 0;
    } else {
      this.lastMeterReadingInM3[0].value =  Number(this.data.details[0].reading);
    }


    this.editForm = new FormGroup({
      firstname: new FormControl(this.data.details[0].Firstname, Validators.required),
      lastname: new FormControl(this.data.details[0].Lastname, Validators.required),
      companyname: new FormControl(this.data.details[0].CompanyName),
      serviceaddress: new FormControl(this.data.details[0].ServiceAddress, Validators.required),
      landmark: new FormControl(this.data.details[0].LandMark),
      contactno: new FormControl(this.data.details[0].ContactNo),
      readingseqno: new FormControl(this.data.details[0].ReadingSeqNo, Validators.required),
      zone: new FormControl(this.data.details[0].Zone, Validators.required),
      rates: new FormControl(this.data.details[0].RateSchedule, Validators.required),
      metersize: new FormControl(this.data.details[0].MeterSize, Validators.required),
      datecreated: new FormControl(this.data.details[0].DateCreated, Validators.required),
      dateinstalled: new FormControl(this.data.details[0].DateInstalled, Validators.required),
      customerstatus: new FormControl(this.data.details[0].CustomerStatus, Validators.required),
    });

    this.editForm.disable();
    this.viewConsumptionPatternAnalysis(this.data.details[0].devEUI, this.selectedTimeline);

    // setTimeout(() => {
    //   console.log("5 seconds");
    //   this.graphDataChart = single;
    // }, 5000);
  }

  onTimelineSelected(option: string) {
    this.selectedTimeline = option;
    this.viewConsumptionPatternAnalysis(this.data.details[0].devEUI, this.selectedTimeline);
  }

  viewConsumptionPatternAnalysis(device_eui:string, timeline:string) {
    this.smartmeter.viewConsumptionPattern(device_eui, timeline)
    .subscribe(res => {
      let result:any = res;
      let graphData = [];

      if(result.status === "No reading found") {
        //Object.assign(this, { single });
        const apiData = [];
        this.graphDataChart = apiData.length > 0 ? apiData : [];
      } else {
        for (const data of result) {
          let objectHolder = {name: data.readingTime, value: data.consumption};
          graphData.push(objectHolder);
        }
        this.graphDataChart = [{
          name: `${this.selectedTimeline} Consumption`,
          series: graphData
        }];

        //Object.assign(this, { this.consumptionPatternData });

      }


    });
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

  openWaterMeterDetails(acc_no) {
    this.concessionaire.selectConcessionaire(acc_no).subscribe(res => {
      this.meterDetails = res;

      const dialogRef = this.dialog.open(ViewWaterMeterComponent, {
        panelClass: ['no-padding'],
        data: {
          details: this.meterDetails,
          headerText: 'Water Meter Details'
        }
      });
    });
  }

  onEditForm() {

    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['statusSuccess']
    };
    if (this.editForm.valid === true) {

      let params = new FormData();
      const {firstname, lastname, companyname, serviceaddress, landmark, contactno, readingseqno, zone, rates, metersize, datecreated, dateinstalled, customerstatus} = this.editForm.value;

      params.append('firstname', firstname);
      params.append('lastname', lastname);
      params.append('companyname', companyname);
      params.append('serviceaddress', serviceaddress);
      params.append('landmark', landmark);
      params.append('contactno', contactno);
      params.append('customerid', this.data.details[0].CustomerID);

      params.append('readingseqno', readingseqno);
      params.append('zone', zone);
      params.append('rates', rates);
      params.append('metersize', metersize);
      params.append('datecreated', datecreated);
      params.append('dateinstalled', dateinstalled);
      params.append('customerstatus', customerstatus);

      const formObject = {
        Lastname: lastname,
        Firstname: firstname,
        AccountNo: this.data.details[0].AccountNo,
        ContactNo: contactno,
        CustomerStatus: customerstatus,
        LastMeterReading: this.data.details[0].LastMeterReading,
        Zone: zone,
      }

      this.concessionaire.editConcessionaireAccount(params)
      .subscribe(res => {
        this.statusMessage = res;

        if (this.statusMessage.status === "Account Updated Successfully") {

          let title = 'Account Update';
          let message = `Concessionaire ${this.data.details[0].AccountNo} has been updated by ${this.sessionStorageService.getSession('username')}`;

          this.notif.insertNotification(title, message).subscribe(data => {
            //this.websock.status_message = devicedeveui;
            console.log(data);
          });

          this.statusColor = 'statusSuccess';
          this.disableForm();
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
          this.websock.sendNotif(message);
          this.websock.updateCustomers();
          this.websock.updateNotification();

          //const index = this.concessionaire.dataSource.data.findIndex(item => item.AccountNo === formObject.AccountNo);

          // if (index !== -1) {
          //   this.concessionaire.dataSource.data.splice(index, 1, formObject);
          //   //this.concessionaire.dataSource.connect();
          //   this.concessionaire.dataSource.data = this.concessionaire.dataSource.data;
          // }


          // this.concessionaire.fetchConcessionaires(this.data.details[0].Zone)
          // .subscribe(res => {
          //   this.result = res;
          //   this.concessionaire.dataSource = [];
          //   this.concessionaire.dataSource = this.result;
          //   //setInterval(() => this.concessionaire.dataSource.paginator = this.paginator ,100);
          //   config.panelClass = [this.statusColor];
          //   this.snackBar.open(this.statusMessage.status, 'Close', config);
          // });
          // setTimeout(() => {
          //   this.websock.updateNotification();
          // }, 1000);


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
    this.editForm.enable();
    this.toggleUpdateButton = 'Cancel Update Concessionaire';
    this.isButtonDisabled = false;
    btnUpdateInformation.style.opacity  = "1";
    btnUpdateInformation.style.cursor = "pointer";
  }

  disableForm() {
    let btnUpdateInformation = document.getElementById("btnUpdateInformation");
    this.editForm.disable();
    this.toggleUpdateButton = 'Update Concessionaire';
    this.isButtonDisabled = true;
    btnUpdateInformation.style.opacity  = "0.6";
    btnUpdateInformation.style.cursor = "not-allowed";
  }

  onToggleUpdateBtn() {
    const isFormGroupEnabled = !this.editForm.disabled;

    if (isFormGroupEnabled) {
      this.disableForm();

    } else {
      this.enableForm();
    }
  }
}
