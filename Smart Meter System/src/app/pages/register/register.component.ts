import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConcessionairesService } from '../../services/concessionaires.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public signUpForm: FormGroup;
  public statusMessage:any;
  public statusColor:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private concessionaire:ConcessionairesService, public dialogRef:MatDialogRef<RegisterComponent>) {
    this.statusMessage = "";
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      role: new FormControl('admin', Validators.required)
    });
  }

  onSignUp() {
    if (this.signUpForm.valid === true) {
      const {firstname, lastname, username, password, role} = this.signUpForm.value;
      this.concessionaire.addUserAccount(firstname, lastname, username, password, role)
      .subscribe(res => {
        console.log(res);
        this.statusMessage = res;
        if (this.statusMessage.status === "Account Added Successfully") {
          this.statusColor = 'statusSuccess';

          setTimeout(() => {
            this.dialogRef.close();
          }, 1500);
        } else {
          this.statusColor = 'statusFailed';
        }
      });
    }

  }

}
