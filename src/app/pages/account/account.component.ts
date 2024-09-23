import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserModalComponent } from 'src/app/shared/components/modals/delete-user/delete-user-modal.component';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { IOrder, IOrderItem, IProfileType } from 'src/app/shared/types/profile-d-t';
import { PLACE_ORDER_API_URL, PROFILE_API_URL } from 'src/envirornments/environment';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public changePasswordForm!: FormGroup;
  public formSubmitted = false;
  username: string = '';
  userProfile!: IProfileType;
  orderedProducts: IOrder[] = [];
  activeTab: number = 0;

  constructor(
    private toastrService: ToastrService,
    private authenticateService: AuthenticateService,
    private httpRequestService: HttpRequestService,
    private router: Router,
    private dialog: MatDialog,
    public cartService: CartService
  ) {
    const name = localStorage.getItem('username');
    this.username = name ? JSON.parse(name) : '';

    //get customer profile
    if (this.username) {
      this.httpRequestService.getRequest(PROFILE_API_URL, `?email=${this.username}`).subscribe({
        next: (res: IProfileType) => {
          if (res) {
            this.userProfile = res;
          }
        },
      });
    }
  }

  ngOnInit() {
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.confirmPasswordValidator,
      }
    );
  }

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  changePassword() {
    this.formSubmitted = true;
    if (this.changePasswordForm.valid) {
      this.authenticateService
        .changePassword(
          this.changePasswordForm.value.oldPassword,
          this.changePasswordForm.value.newPassword
        )
        .then(() => {
          this.toastrService.success('Password has been changed successfully');
          this.changePasswordForm.reset();
          this.formSubmitted = false;
        })
        .catch((error) => {
          this.toastrService.error(error);
        });
    }
  }

  signOut() {
    this.authenticateService.signOut().then(() => {
      this.toastrService.success('Successfully signed out!');
      this.router.navigate(['/pages/login']);
      this.username = '';
      this.authenticateService._isUserSignedIn.next(false);
      localStorage.clear();
    });
  }

  fetchOrders() {
    if(this.orderedProducts.length === 0){
    this.httpRequestService.getRequest(PLACE_ORDER_API_URL, `?customerId=${this.userProfile.id}`).subscribe({
      next: (response: IOrder[]) => {
        if (response) {
          response.forEach((product: IOrder) => {
            const randId = Math.floor(1000 + Math.random() * 9000);
            product?.orderItems?.forEach((res: IOrderItem) => {
              this.orderedProducts.push({
                orderNumber: `#${product?.orderNumber || randId}`,
                productName: res?.product?.name,
                quantity: res?.quantity,
                price: res?.totalPrice,
                status: product?.status,
                id: product?.id
              });
            });
          });
        }
      },
      error: (err) => {
        this.toastrService.error(err.message);
      }
    });
  }
  }

  // navigate to info link
  navigateToLink() {
    window.open("https://roadmap.sh/guides/what-is-internet", '_blank');
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  openModal(): void {
    this.dialog.open(DeleteUserModalComponent, {
      width: '500px',
    });
  }
}
