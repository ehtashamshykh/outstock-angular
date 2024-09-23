import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ICategoriesType } from 'src/app/shared/types/category-d-t';
import { API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss'],
})
export class ShopCategoryComponent {
  @Input() style_2: Boolean = false;
  @Input() style_3: Boolean = false;
  @Input() style_4: Boolean = false;
  @Input() shop_category_2: Boolean = false;
  public categoryData: ICategoriesType[] = [];

  constructor(
    public utilsService: UtilsService,
    private httpRequestService: HttpRequestService,
    private toastrService: ToastrService
  ) {
    const isLoggedIn = localStorage.getItem("username");
    // get categories
    if(isLoggedIn){
    this.httpRequestService.getRequest(API_URL, '/categories/featured').subscribe({
        next: (res: ICategoriesType[]) => {
          if (res) {
            this.categoryData = res;
          }
        },
        error: (err) => {
          this.toastrService.error(err.message);
        }
      });
    }
  }
}