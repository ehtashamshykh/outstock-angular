import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-seller-filtering',
  templateUrl: './seller-filtering.component.html',
  styleUrls: ['./seller-filtering.component.scss']
})
export class SellerFilteringComponent {

  public sellers: string[] = [];
  public seller: string | null = null;

  public activeCls = '';

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller
  ) {
    this.productService.products.subscribe((products) => {
      this.sellers = [...new Set(products.map((p) => p.seller))];
    });
    this.route.queryParams.subscribe((params) => {
      this.seller = params['seller'] ? params['seller'] : null;
    });
  }

  handleSeller(seller: string) {
    this.activeCls = seller;
    const queryParams: Params = {
      seller: seller.toLowerCase(),
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }

}
