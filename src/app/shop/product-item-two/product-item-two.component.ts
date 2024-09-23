import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { CART_API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-product-item-two',
  templateUrl: './product-item-two.component.html',
  styleUrls: ['./product-item-two.component.scss']
})
export class ProductItemTwoComponent {
  @Input() product!: IProduct;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
    private httpRequestService: HttpRequestService
  ) {}

  // add to cart
  addToCart(item: IProduct) {
    const items = { ...localStorage };
    const userId = Object.keys(items).find(key => key.includes('LastAuthUser'));
    const id = items[`${userId}`];

     // add item to cart
    const payload = {
      userId: id,
      productId: item.id
    }
    this.httpRequestService.postRequest(CART_API_URL, payload).subscribe({
      next: (res: IProduct) =>{
      },
      error: async (err) => {
       console.log('err', err);
      },    
    })
    // this.cartService.addCartProduct(item);
  }
  // Function to check if an item is in the cart
  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd: IProduct) => prd.id === item.id);
  }
}
