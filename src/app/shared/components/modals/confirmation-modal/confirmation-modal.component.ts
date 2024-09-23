import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

export class ConfirmationModalComponent {
  public confirmationForm!: FormGroup;
  email: string = '';
  public formSubmitted = false;


constructor(private toastrService: ToastrService,
  private readonly authenticateService: AuthenticateService,
  private router: Router,
  private dialogRef: MatDialogRef<ConfirmationModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.email = this.data;
  }

  ngOnInit(){
    this.confirmationForm = new FormGroup({
      code: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.formSubmitted = true;
    if (this.confirmationForm.valid) {
      this.authenticateService.confirmSignUp(this.email, this.confirmationForm.value.code).then((response)=> {
        if (response?.isSignUpComplete){
          this.toastrService.success('Your email has been verified successfully');
          this.onCancel();
          this.router.navigate(["/pages/login"]);
        }
      }).catch(error => {
        this.toastrService.error(error);
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}