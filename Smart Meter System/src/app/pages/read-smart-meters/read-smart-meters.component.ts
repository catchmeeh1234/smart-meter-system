import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ZoneService } from '../../services/zone.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select/public-api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewConcessionaireComponent } from '../modal/view-concessionaire/view-concessionaire.component';
import { BillService } from '../../services/bill.service';
import { ConcessionairesService } from '../../services/concessionaires.service';
import { SmartmeterService } from '../../services/smartmeter.service';

@Component({
  selector: 'app-read-smart-meters',
  templateUrl: './read-smart-meters.component.html',
  styleUrls: ['./read-smart-meters.component.scss']
})
export class ReadSmartMetersComponent implements OnInit {

  public dataSource:any = [];
  public displayedColumns = ['BillNo', 'AccountNo', 'CustomerName', 'PreviousReading', 'CurrentReading','Actions'];
  public result:any;

  public selectedZone:string;
  public zones:any;

  public btnStatus:string;

  public selectedMonthYear:string = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public _details:any;

  constructor(private zone:ZoneService, public dialog: MatDialog, private bill:BillService, private concessionaire:ConcessionairesService, private smartmeter:SmartmeterService) {

  }

  ngOnInit(): void {
    this.displayZones();

    // if (this.selectedZone === undefined || this.selectedZone === null) {
    //   this.concessionaire.dataSource = [];
    // } else {
    //   this.onDisplayConcessionaires();
    // }

  }

  searchBills() {
    if (this.selectedMonthYear == "" || this.selectedZone == "") {
      return;
    }
    this.bill.getBills(this.selectedZone, this.selectedMonthYear)
    .subscribe(res => {
      this.result = res;
      if (this.result.status === "No Bills found") {
        return;
      } else {
        this.dataSource = new MatTableDataSource(this.result);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  readWaterMeter(billno:number, accountno:string) {
    this.concessionaire.selectConcessionaire(accountno)
    .subscribe(res => {
      let result:any = res;
      if (result[0].devEUI === null) {
          return;
      }
      this.smartmeter.getLastReading(result[0].devEUI)
      .subscribe(data => {
        let reading:any = data;
        this.bill.updateBills(reading, billno).subscribe(response => {
          let msg:any = response;

          if (msg.status === "Bill read Successfully") {
            alert("Bill read Successfully");
          } else {
            alert("There was an error reading the bill");
          }
          this.searchBills();
        });
      });
    });

  }

  displayMonthAndYear() {
    // Get the selected date from the input element
    const selectedDate = new Date((<HTMLInputElement>document.getElementById("readingDate")).value);

    // Get the month and year from the selected date
    const month = selectedDate.toLocaleString('default', { month: 'long' });
    const year = selectedDate.getFullYear();

    // Display the month and year
    this.selectedMonthYear = `${month} ${year}`;
  }


  //fetch zones
  displayZones() {
    this.zone.getZones().subscribe(data => {
      this.zones = data;
      this.selectedZone = this.zones[0].ZoneName;
    });
  }

  onSelectZone() {

    if (this.selectedZone === undefined || this.selectedZone === null) {
      this.dataSource = [];
    } else {
    }
  }

  //table controls
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  colorStatus(status: string) {
    if (status == 'Active' || status == 'active') {
      //console.log('green');
      return 'primary';
    } else {
      //console.log('not black');
      return 'warn'
    }
  }

  //pop up modal for more concessionaire details
  // openConcessionaireDetails(accountNo) {
  //   this.concessionaire.selectConcessionaire(accountNo).subscribe(res => {
  //     this._details = res;

  //     const dialogRef = this.dialog.open(ViewConcessionaireComponent, {
  //       panelClass: ['no-padding'],
  //       data: {
  //         details: this._details,
  //         headerText: 'Concessionaire Details'
  //       }
  //     });

  //   });
  // }

}
