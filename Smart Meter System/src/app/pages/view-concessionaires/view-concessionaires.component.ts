import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ZoneService } from '../../services/zone.service';
import { ConcessionairesService } from '../../services/concessionaires.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select/public-api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewConcessionaireComponent } from '../modal/view-concessionaire/view-concessionaire.component';
import { AddConcessionaireComponent } from '../add-concessionaire/add-concessionaire.component';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-view-concessionaires',
  templateUrl: './view-concessionaires.component.html',
  styleUrls: ['./view-concessionaires.component.scss']
})
export class ViewConcessionairesComponent implements OnInit {

  //public dataSource:any;
  public displayedColumns = ['AccountNo', 'FullName', 'Zone', 'LastReading', 'Status'];
  public result:any;

  public selectedZone:string;
  public zones:any;

  public btnStatus:string;
  public user_role:string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public _details:any;

  constructor(private zone:ZoneService, public concessionaire:ConcessionairesService, public dialog: MatDialog, private sessionStorageService:SessionStorageService) {
    this.user_role = this.sessionStorageService.getSession("role");
  }

  ngOnInit(): void {
    this.displayZones();

    if (this.selectedZone === undefined || this.selectedZone === null) {
      this.concessionaire.dataSource = [];
    } else {
      this.onDisplayConcessionaires();
    }

  }

  onDisplayConcessionaires() {
    this.concessionaire.fetchConcessionaires(this.selectedZone)
    .subscribe(data => {
      this.result = data;
      this.concessionaire.dataSource = new MatTableDataSource(this.result);
      this.concessionaire.dataSource.paginator = this.paginator;
    });
  }

  //fetch zones
  displayZones() {
    this.zone.getZones().subscribe(data => {
      this.zones = data;
      let allZones = {
        "ZoneID": "999",
        "ZoneName": "All",
        "HandheldDeviceID": null,
        "LastNumber": "0"
      };

      this.zones.unshift(allZones);
    });
  }

  onSelectZone() {

    if (this.selectedZone === undefined || this.selectedZone === null) {
      this.concessionaire.dataSource = [];
    } else {
      this.onDisplayConcessionaires();
    }
  }

  //table controls
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.concessionaire.dataSource.filter = filterValue.trim().toLowerCase();
  }

  colorStatus(status: string) {
    if (status == 'Active' || status == 'active') {
      return 'primary';
    } else {
      return 'warn'
    }
  }

  onOpenAddCustomer() {
    const dialogRef = this.dialog.open(AddConcessionaireComponent, {
      panelClass: ['no-padding'],
      data: {
        headerText: 'Create New Concessionaire'
      }
    });
  }

  //pop up modal for more concessionaire details
  openConcessionaireDetails(accountNo) {
    this.concessionaire.selectConcessionaire(accountNo).subscribe(res => {
      this._details = res;

      const dialogRef = this.dialog.open(ViewConcessionaireComponent, {
        panelClass: ['no-padding'],
        data: {
          details: this._details,
          headerText: 'Concessionaire Details'
        }
      });

    });
  }
}
