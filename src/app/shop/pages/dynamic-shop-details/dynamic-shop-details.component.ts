import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IProduct } from 'src/app/shared/types/product-d-t';

@Component({
  selector: 'app-dynamic-shop-details',
  templateUrl: './dynamic-shop-details.component.html',
  styleUrls: ['./dynamic-shop-details.component.scss'],
})
export class DynamicShopDetailsComponent {
  public product: IProduct | null | undefined;
  productId!: any;
  brand: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productService.getProductById(this.productId);
          }
          return of<IProduct | null>(null); // Emit null if there's no productId
        })
      )
      .subscribe((product: IProduct | null | undefined) => {   
        if (product) {
          this.product = product
          this.brand = this.product?.brand ?? '';
        } else {
          // Product not found, navigate to 404 page
          this.router.navigate(['/404']);
        }
      });
  }
}