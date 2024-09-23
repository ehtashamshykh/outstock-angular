import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent {
  constructor(public cartService: CartService) {
    const username = localStorage.getItem("username");

    if (username) {
      const items = { ...localStorage };
      const userId = Object.keys(items).find(key => key.includes('LastAuthUser'));
      this.cartService.userID = items[`${userId}`];
      if (this.cartService.userID && this.cartService.callCheck) {
        this.cartService.getProducts();
        this.cartService.callCheck = false;
      }
    } else {
      this.cartService.getCartItems.length = 0;
      this.cartService.callCheck = true;
    }
  }
}
