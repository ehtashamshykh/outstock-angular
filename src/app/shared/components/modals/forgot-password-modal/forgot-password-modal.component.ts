import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent {

  public emailForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService,
    private router: Router
  ){ }

  ngOnInit(){
    this.emailForm = new FormGroup({
      email:new FormControl(null, [Validators.required,Validators.email]),
    });
  }

  onSubmit(){
    this.formSubmitted = true;
    if (this.emailForm.valid){
      this.authenticateService.resetPassword(this.emailForm.value.email).then((response: any) => {
        if (response?.nextStep?.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE"){
          this.toastrService.success("We have sent a code to your email");
          this.cancel();
          this.router.navigate(['/pages/new-password']);
        }
      }).catch(error => {
        this.toastrService.error(error);
      });
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  get email() { return this.emailForm.get('email') }

}
