import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { IProduct } from 'src/app/shared/types/product-d-t';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  couponCode: string = '';
  shipCost: number = 0;

  constructor (public cartService:CartService, private httpRequestService: HttpRequestService) {}

  handleCouponSubmit() {
    if(this.couponCode){
      this.couponCode = ''
    }
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }
}
