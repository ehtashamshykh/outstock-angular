import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ICategoriesType } from 'src/app/shared/types/category-d-t';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss'],
})
export class SearchPopupComponent {
  public searchText: string = '';
  public productType: string = '';
  public minPrice: number = 0;
  public maxPrice: number = this.productService.maxPrice;
  subCategories: any[] = [];
  constructor(
    public utilsService: UtilsService,
    private router: Router,
    public productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.productType = params['productType'] ? params['productType'] : null;
      this.minPrice = params['minPrice'] ? params['minPrice'] : 0;
      this.maxPrice = params['maxPrice']
        ? params['maxPrice']
        : this.productService.maxPrice;
      this.searchText = params['searchText'] ? params['searchText'] : null;
    });
    this.productService.fetchCategories();
  }

  handleCategory(category: ICategoriesType) {
    this.subCategories = category.children;
  }

  handleProductType(productType: string) {
    const queryParams: Params = {
      productType: productType.toLowerCase(),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  handleSearchSubmit() {
    let query = "";
    this.route.queryParams.subscribe((response: any) => {
      const queryParams: Params = response;

      this.router.navigate(['/shop'], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      });

      const { page, ...queryData } = response;
      if (this.searchText) queryData.searchText = this.searchText;
      query = Object.entries(queryData).map(([key, value]) => `${key}=${value}`).join('&');
    });
    if (Object.keys(this.route.snapshot.queryParams).length || this.searchText){
      this.productService.getFilteredProducts(query);
    }
  }

  updateFilter(tags: any) {
    console.log('tags', tags);
  }

  handleResetFilter() {
    if (!this.productService.fetchProductCheck){
      this.productService.getProducts();
      this.productService.fetchProductCheck = true;
    }
    this.minPrice = 0;
    this.maxPrice = this.productService.maxPrice;
    this.router.navigate(['/shop']);
  }
}
