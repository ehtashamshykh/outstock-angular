import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordModalComponent } from 'src/app/shared/components/modals/forgot-password-modal/forgot-password-modal.component';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService, private authticateService: AuthenticateService, private router: Router, private dialg: MatDialog) { }

  ngOnInit () {
    this.loginForm = new FormGroup({
      email:new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, [Validators.required,Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authticateService.signIn(this.loginForm.value.email, this.loginForm.value.password).then(response => {
        this.toastrService.success("Successfully Logged In!");
        this.loginForm.reset();
        this.formSubmitted = false; // Reset formSubmitted to false
        this.authticateService.getCurrentUser().then((res: any) => {
          localStorage.setItem('username', JSON.stringify(res.signInDetails.loginId));
          this.authticateService._isUserSignedIn.next(true);
          this.router.navigate(['/home']);
        }).catch((error) => {
          console.log('error in getCurrentUser: ', error);
        });
      }).catch(error => {
        this.toastrService.error(error);
      })
    }
  }

  openForgotPasswordModal(){
    this.dialg.open(ForgotPasswordModalComponent, {
      width: "500px"
    });
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
