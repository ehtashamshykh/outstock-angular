import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss'],
})
export class ProductBannerComponent {
  @Input() style_2: boolean = false;
  @Input() style_3: boolean = false;

  public bannerProducts: IProduct[] = [];

  constructor(
    private httpRequestService: HttpRequestService,
    private toastrService: ToastrService
  ) {
    const isLoggedIn = localStorage.getItem('username');
    // get banner products
    if (isLoggedIn) {
      this.httpRequestService.getRequest(API_URL, '/products/banner').subscribe({
          next: (res: IProduct[]) => {
            if (res) {
              this.bannerProducts = res;
            }
          },
          error: (err) => {
            this.toastrService.error(err.message);
          },
        });
    }
  }
}
