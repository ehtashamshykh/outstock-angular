import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

  public newPasswordForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService,
    private router: Router
  ){ }

  ngOnInit(){
    this.newPasswordForm = new FormGroup({
      code:new FormControl(null, [Validators.required]),
      email:new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, [Validators.required,Validators.minLength(6)]),
      confirmPassword:new FormControl(null, [Validators.required]),
    },
    {
      validators: this.confirmPasswordValidator
    }
    );
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return confirmPassword && password !== confirmPassword ? { 'passwordMismatch': true } : null;
  }

  onSubmit(){
    this.formSubmitted = true;
    if (this.newPasswordForm.valid){
      this.authenticateService.confirmPassword(this.newPasswordForm.value.email, this.newPasswordForm.value.password, this.newPasswordForm.value.code).then(response => {
        this.toastrService.success("Password has been changed successfully");
        this.router.navigate(["/pages/login"]);
      }).catch(error => {
        this.toastrService.error(error);
      });
    }
  }

  get code() { return this.newPasswordForm.get('code') }
  get email() { return this.newPasswordForm.get('email') }
  get password() { return this.newPasswordForm.get('password') }
  get confirmPassword() { return this.newPasswordForm.get('confirmPassword') }
}
