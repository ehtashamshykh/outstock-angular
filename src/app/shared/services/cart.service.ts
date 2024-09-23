import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICartProduct, IProduct } from '../types/product-d-t';
import { HttpRequestService } from './http-request.service';
import { CART_API_URL } from 'src/envirornments/environment';

const state = {
  cart_products: JSON.parse(localStorage['cart_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public orderQuantity: number = 1;
  public isCartOpen: boolean = false;
  userID!: string;
  getCartItems: ICartProduct[] = [];
  callCheck: boolean = true;
  constructor(private toastrService: ToastrService, private httpRequestService: HttpRequestService) {}

  public getCartProducts(): IProduct[] {
    return state.cart_products;
  }

  getProducts() {
    this.httpRequestService.getByIdRequest(CART_API_URL, `?userId=${this.userID}`).subscribe({
      next: (response: ICartProduct[]) => {
        this.getCartItems = response ? response : [];
      },
      // error: (error) => this.toastrService.error(error)
    });
  }

  handleOpenCartSidebar () {
    this.isCartOpen = !this.isCartOpen
  }

  // add_cart_product
  addCartProduct(productId: string) {
    const payload = {
      userId: this.userID,
      productId: productId
    };
    this.httpRequestService.postRequest(CART_API_URL, payload).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (error) => this.toastrService.error(error)
    });
  };

// total price quantity
  public totalPriceQuantity() {
    return this.getCartItems.reduce(
      (cartTotal: { total: number; quantity: number }, cartItem: any) => {
        const quantity = cartItem.quantity;
        const price = cartItem?.product?.price;
        const itemTotal = price * quantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += quantity;
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
  };


  // quantity increment
  increment() {
    return this.orderQuantity = this.orderQuantity + 1;
  }

  // quantity decrement
  decrement() {
    return this.orderQuantity =
      this.orderQuantity > 1
        ? this.orderQuantity - 1
        : this.orderQuantity = 1;
  }

  // quantityDecrement
  quantityDecrement(payload: ICartProduct) {
    this.getCartItems.map((item: ICartProduct, i: number) => {
      if (item.productId === payload.productId) {
        if (item.quantity > 1) {
          item.quantity = item.quantity - 1;
        } else {
          this.getCartItems.splice(i, 1);
        }
      }
    });
  };

  // remover_cart_products
  removeCartProduct(item: ICartProduct) {
    const payload = {
      userId: this.userID,
      productId: item?.productId
    };
    this.httpRequestService.deleteRequest(CART_API_URL, payload).subscribe({
      next: () => {
        this.quantityDecrement(item);
        this.toastrService.success("Item has been removed from cart.");
      },
      error: (error) => this.toastrService.error(error)
    });
  };

  // clear cart
  clear_cart() {
    const confirmMsg = window.confirm(
      "Are you sure deleted your all cart items ?"
    );
    if (confirmMsg) {
      state.cart_products = [];
    }
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };
  // initialOrderQuantity
  initialOrderQuantity() {
    return this.orderQuantity = 1;
  };
}
