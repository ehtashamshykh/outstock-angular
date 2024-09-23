import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { IWishlistProduct } from 'src/app/shared/types/product-d-t';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  
  wishlistItems: IWishlistProduct[] = [];

  constructor(
    public wishlistService: WishlistService,
    public cartService: CartService
  ) {
    this.wishlistService.getWishlistProduct();
  }
}
