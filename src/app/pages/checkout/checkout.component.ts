import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentModalComponent } from 'src/app/shared/components/modals/payment-modal/payment-modal.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { ICartProduct } from 'src/app/shared/types/product-d-t';
import { IPaymentMethod, IProfileType } from 'src/app/shared/types/profile-d-t';
import { PROFILE_API_URL } from 'src/envirornments/environment';
import { PLACE_ORDER_API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public isOpenLogin = false;
  public isOpenCoupon = false;
  userID: string | undefined;
  addressId: string = '';
  paymentMethods: IPaymentMethod[] = [];
  public shipCost: number = 0;
  public couponCode: string = '';
  public payment_name: string = '';
  userDetails!: IProfileType;
  paymentType!: number;
  paymentMethodId!: string;
  paymentMethodName: string | undefined;

  constructor(
    private router: Router,
    public cartService: CartService,
    private toastrService: ToastrService,
    private httpRequestService: HttpRequestService,
    private dialog: MatDialog
  ) { }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }

  handleCouponSubmit() {
    console.log(this.couponCode);
    // Add coupon code handling logic here
    if (this.couponCode) {
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = '';
    }
  }

  // handle payment item
  handlePayment(value: string) {
    this.payment_name = value;
  }

  public checkoutForm!: FormGroup;
  public formSubmitted = false;

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      company: new FormControl(null),
      country: new FormControl('bangladesh', Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      apartment: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      orderNote: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    const name = localStorage.getItem('username');
    const username = name ? JSON.parse(name) : '';
    if (username) {
      this.httpRequestService.getRequest(PROFILE_API_URL, `?email=${username}`).subscribe({
          next: (res: IProfileType) => {
            if (res) {
              this.userDetails = res;
              this.userID = res?.id;
              this.addressId = res?.addresses[0].id;
              this.paymentMethods = res?.paymentMethods;
              this.firstName?.patchValue(res?.firstName);
              this.lastName?.patchValue(res?.lastName);
              this.address?.patchValue(
                `${res?.addresses[0]?.addressLine1} ${res?.addresses[0]?.addressLine2}, ${res?.addresses[0]?.city}, ${res?.addresses[0]?.state} ${res?.addresses[0]?.country}`
              );
              this.apartment?.patchValue(res?.addresses[0]?.addressType);
              this.city?.patchValue(res?.addresses[0]?.city);
              this.state?.patchValue(res?.addresses[0]?.country);
              this.zipCode?.patchValue(res?.addresses[0]?.zipCode);
              this.email?.patchValue(res?.email);
              this.phone?.patchValue(res?.phoneNumber);
            }
          },
        });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.checkoutForm.valid) {
      const cartItems = this.cartService.getCartItems.map((res: ICartProduct) => {
        return {
          productId: res.productId,
          price: res.product.price,
          quantity: res.quantity,
        };
      });
      const payload = {
        customerId: this.userID,
        billingAddressId: this.addressId,
        shippingAddressId: this.addressId,
        paymentMethodId: this.paymentMethodId ? this.paymentMethodId : this.paymentMethods[0].id,
        orderItems: cartItems,
      };
      this.httpRequestService.postRequest(PLACE_ORDER_API_URL, payload).subscribe({
          next: () => {
            this.toastrService.success(`Order place successfully`);
            this.router.navigate(['/pages/order-details']);
          },
          error: async (err) => {
            console.log('err', err);
          },
        });

      // Reset the form
      this.checkoutForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  paymentMethodDialog(){
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: "500px",
      data: { userDetail: this.userDetails.paymentMethods }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.paymentMethodId = res;
        const paymentMethod = this.userDetails.paymentMethods.find(method => method.id === this.paymentMethodId);
        this.paymentMethodName = paymentMethod?.provider
      }
    });
  }

  get firstName() { return this.checkoutForm.get('firstName') }
  get lastName() { return this.checkoutForm.get('lastName') }
  get company() { return this.checkoutForm.get('company') }
  get country() { return this.checkoutForm.get('country') }
  get address() { return this.checkoutForm.get('address') }
  get city() { return this.checkoutForm.get('city') }
  get state() { return this.checkoutForm.get('state') }
  get apartment() { return this.checkoutForm.get('apartment') }
  get zipCode() { return this.checkoutForm.get('zipCode') }
  get phone() { return this.checkoutForm.get('phone') }
  get orderNote() { return this.checkoutForm.get('orderNote') }
  get email() { return this.checkoutForm.get('email') }

}
