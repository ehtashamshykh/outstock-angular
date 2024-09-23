import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(private dialog: MatDialog, private toastrService: ToastrService, private readonly authenticateService: AuthenticateService) { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  async onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.authenticateService.signUp(this.registerForm.value.email, this.registerForm.value.password).then((response) => {
        if(response){
          this.toastrService.success('We have sent a code to your email please verify your email');
          this.dialog.open(ConfirmationModalComponent, {
            data: this.registerForm.value.email
          });
        }
      }).catch((error) => {
        this.toastrService.error(error);
      });

      // this.registerForm.reset();
      // this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

}
