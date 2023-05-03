import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcessionairesService } from '../../../services/concessionaires.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  private statusColor = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private concessionaire: ConcessionairesService,
    private dialogRef:MatDialogRef<ConfirmationModalComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  onConfirm() {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['statusSuccess']
    };

    let params = new FormData();
    params.append('AccountNo', this.data.account_no);
    params.append('DeviceEUI', this.data.device_eui);

    this.concessionaire.bindSmartMeter(params)
    .subscribe(data => {
      let result:any = data;
      if (result.status === "Smart meter binded") {
        this.statusColor = 'statusSuccess';
      } else {
        this.statusColor = 'statusFailed';
      }
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);

      config.panelClass = [this.statusColor];
      this.snackBar.open(result.status, 'Close', config);

    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
