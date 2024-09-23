import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import product_data from '../data/product-data';
import { IProduct } from '../types/product-d-t';
import { HttpRequestService } from './http-request.service';
import { API_URL } from 'src/envirornments/environment';
import { ICategoriesType } from '../types/category-d-t';
import { ToastrService } from 'ngx-toastr';

const all_products = product_data;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public filter_offcanvas: boolean = false;
  public pageSize: number = 9;
  categoryData: ICategoriesType[] = [];
  _fetchProducts = new BehaviorSubject<IProduct[]>([]);
  fetchProducts = this._fetchProducts.asObservable();
  fetchProductCheck: boolean = true;

  // Get Products
  public get products(): Observable<IProduct[]> {
    return of(product_data);
  }

  constructor(private httpRequestService: HttpRequestService, private toastrService: ToastrService) {}

  activeImg: string | undefined;

  handleImageActive(img: string) {
    this.activeImg = img;
  }

  getProducts() {
    this.httpRequestService.getRequest(API_URL, '/products').subscribe({
      next: ((res: IProduct[]) => {
        if (res) {
          this._fetchProducts.next(res);
        }
      }),
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
  }

  getFilteredProducts(filter: string){
    this.httpRequestService.getRequest(API_URL, `/products?query=${filter}`).subscribe({
      next: ((res: IProduct[]) => {
        if (res) {
          this._fetchProducts.next(res);
        }
      }),
      error: (error) => {
        this.toastrService.error(error.message);
      }
    });
    this.fetchProductCheck = false;
  }

  // get all categories
  fetchCategories(){
    if(this.categoryData.length === 0){
      this.httpRequestService.getRequest(API_URL, '/categories').subscribe({
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

  // Get Products By id
  public getProductById(id: number): Observable<IProduct | undefined> {
    return this.httpRequestService.getByIdRequest(API_URL, `/products/${id}`).pipe(
      tap((data: IProduct | undefined) => {
        // Perform any necessary operations with the data here
      }),
      catchError((error: any) => {
        console.error(`Error: ${error.message}`);
        return of(undefined);
      })
    );
  }

  // Get related Products
  public getRelatedProducts(productId: string, brand: string): Observable<IProduct[]> {
    return of([]);
  }

  // Get max price
  public get maxPrice(): number {
    const max_price = all_products.reduce((max, product) => {
      return product.price > max ? product.price : max;
    }, 0);
    return max_price;
  }
  
  // shop filterSelect
  public filterSelect = [
    { value: 'asc', text: 'Default Sorting' },
    { value: 'low', text: 'Low to Hight' },
    { value: 'high', text: 'High to Low' },
    { value: 'on-sale', text: 'On Sale' },
  ];

  // Get Product Filter
  public filterProducts(): Observable<IProduct[]> {
    return this.fetchProducts.pipe(
      map((product) => {
        return product;
      })
    );
  }

  // Sorting Filter
  public sortProducts(products: IProduct[], payload: string): any {
    if (payload === 'asc') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    } else if (payload === 'sale') {
      return products.filter((p) => p.discount! > 0);
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 9
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(totalPages < endPage ? 2 : endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
