import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConcessionairesService } from '../../../services/concessionaires.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-bind-water-meter',
  templateUrl: './bind-water-meter.component.html',
  styleUrls: ['./bind-water-meter.component.scss']
})
export class BindWaterMeterComponent implements OnInit {
  public displayedColumns = ['CustomerName', 'Zone', 'Action'];
  private result:any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public concessionaire:ConcessionairesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onDisplayConcessionaires();
  }

  onDisplayConcessionaires() {
    this.concessionaire.displayAllConcessionaires()
    .subscribe( data => {
      this.result = data;
      //this.concessionaire.dataSource = result;
      this.concessionaire.dataSource = new MatTableDataSource(this.result);
      this.concessionaire.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.concessionaire.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onConfirmSmartMeterBind(account_no) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: ['no-padding'],
      data: {
        headerText: 'Confirmation',
        message: 'Are you sure you want to bind this customer to the smart meter?',
        account_no: account_no,
        device_eui: this.data.device_eui
      }
    });
  }
}
