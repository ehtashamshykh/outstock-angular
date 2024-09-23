import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ICategoriesType } from 'src/app/shared/types/category-d-t';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public categoryData: ICategoriesType[] = [];
  public category: string | null = null;
  public subcategory: string | null = null;
  @Output() catProducts: EventEmitter<IProduct[]> = new EventEmitter<IProduct[]>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public utilsService: UtilsService,
    public productService: ProductService,
    private httpRequestService: HttpRequestService
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      this.category = params['category'] ? params['category'] : null;
      this.subcategory = params['subcategory'] ? params['subcategory'] : null;
    });
  }
 
  public handleParentCategory(categoryValue: string): void {
    const currentQueryParams = this.route.snapshot.queryParams; // Get current query parameters
    const queryParams = {
      ...currentQueryParams, // Keep the existing query parameters
      category: this.utilsService.convertToURL(categoryValue),
    };
    this.router.navigate(['/shop'], { queryParams });
  }

  public handleSubCategory(subcategoryId: string): void {

    this.httpRequestService.getRequest(API_URL, `/products?categoryId=${subcategoryId}`).subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.catProducts.emit(res);
        }
      },
    });
    // const currentQueryParams = this.route.snapshot.queryParams; // Get current query parameters
    // const queryParams = {
    //   ...currentQueryParams, // Keep the existing query parameters
    //   subcategory: this.utilsService.convertToURL(subcategoryValue),
    // };
    // this.router.navigate(['/shop'], { queryParams });
  }
}
