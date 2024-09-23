import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { CART_API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})

export class ProductListItemComponent {
  @Input() product!: IProduct;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public compareService: CompareService,
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
  }

  // add to cart
  addToCompare(product: IProduct) {
    this.compareService.add_compare_product(product);
  }

  // Function to check if an item is in the cart
  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd: IProduct) => prd.id === item.id);
  }
  isItemInWishlist(item: IProduct): boolean {
    return this.wishlistService.getWishlistProducts().some((prd: IProduct) => prd.id === item.id);
  }
  isItemInCompare(item: IProduct): boolean {
    return this.compareService.getCompareProducts().some((prd: IProduct) => prd.id === item.id);
  }
}
