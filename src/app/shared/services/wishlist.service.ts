import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../types/product-d-t';
import { HttpRequestService } from './http-request.service';
import { WISHLIST_API_URL } from 'src/envirornments/environment';
import { IWishlistProduct } from '../types/product-d-t';

const state = {
  wishlists: JSON.parse(localStorage['wishlist_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})


export class WishlistService {

  userID!: string;
  getWishlistItems: IWishlistProduct[] = []

  constructor(private toastrService: ToastrService, private httpRequestService: HttpRequestService) {
    const items = { ...localStorage };
    const userId = Object.keys(items).find(key => key.includes('LastAuthUser'));
    this.userID = items[`${userId}`];
   }

  public getWishlistProducts () {
    return state.wishlists;
  }

  //get wishlist products
  getWishlistProduct() {
    this.httpRequestService.getByIdRequest(WISHLIST_API_URL, `?customerId=${this.userID}`).subscribe({
      next: (response: IWishlistProduct[]) => {
        this.getWishlistItems = response ? response : [];
      },
      // error: (error) => this.toastrService.error(error)
    });
  }

  // add_wishlist_product
  addWishlistProduct(item: IProduct) {
    const payload = {
      customerId: this.userID,
      productId: item.id
    };
    this.httpRequestService.postRequest(WISHLIST_API_URL, payload).subscribe({
      next: () => {
        this.toastrService.success('Item added to wishlist')
      },
      error: (error) => this.toastrService.error(error)
    });
  };

  // removeWishlist product
  removeWishlist(item: IWishlistProduct) {
    const payload = {
      customerId: this.userID,
      productId: item.productId
    };
    this.httpRequestService.deleteRequest(WISHLIST_API_URL, payload).subscribe({
      next: () => {
        const index = this.getWishlistItems.findIndex(
          (request) => request.productId === item.productId
        );
        this.getWishlistItems.splice(index, 1);
        this.toastrService.success("Item has been removed from wishlist.");
      },
      error: (error) => this.toastrService.error(error)
    });
  };
}
