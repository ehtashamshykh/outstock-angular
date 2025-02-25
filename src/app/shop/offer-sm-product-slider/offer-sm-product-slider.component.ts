import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-offer-sm-product-slider',
  templateUrl: './offer-sm-product-slider.component.html',
  styleUrls: ['./offer-sm-product-slider.component.scss']
})

export class OfferSmProductSliderComponent {

  @ViewChild('trendingProductSliderContainer') trendingProductSliderContainer!: ElementRef;
  @ViewChild('onSellSliderContainer') onSellSliderContainer!: ElementRef;
  @ViewChild('topRatedSellSliderContainer') topRatedSellSliderContainer!: ElementRef;

  public trendingSellInstance: Swiper | undefined;
  public onSellInstance: Swiper | undefined;
  public topRatedSellInstance: Swiper | undefined;
  public trendingSliderProducts: {id:number;products:IProduct[]}[] = [];
  public discountSliderProducts: {id:number;products:IProduct[]}[] = [];
  public topRatedSliderProducts: {id:number;products:IProduct[]}[] = [];

  constructor(private httpRequestService: HttpRequestService) {

    // get top seller products
    this.httpRequestService.getRequest(API_URL, '/products/topsellers').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.trendingSliderProducts = this.chunkArray(res, 3);
        }
      },
    });

    // get sales products
    this.httpRequestService.getRequest(API_URL, '/products/sales').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.discountSliderProducts = this.chunkArray(res, 3);
        }
      },
    });

    // get top rated products
    this.httpRequestService.getRequest(API_URL, '/products/toprated').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.topRatedSliderProducts = this.chunkArray(res, 3);
        }
      },
    });

  }

  private chunkArray(arr: IProduct[], chunkSize: number) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push({id:i+1,products:arr.slice(i, i + chunkSize)});
    }
    return chunkedArray;
  }

  ngAfterViewInit() {
    if (this.trendingProductSliderContainer) {
      this.trendingSellInstance = new Swiper('.trending_slider', {
        slidesPerView: 1,
        spaceBetween: 0,
      })
    }
    if (this.onSellSliderContainer) {
      this.onSellInstance = new Swiper('.on_sell_slider', {
        slidesPerView: 1,
        spaceBetween: 0,
      })
    }
    if (this.topRatedSellSliderContainer) {
      this.topRatedSellInstance = new Swiper('.top_rated_slider', {
        slidesPerView: 1,
        spaceBetween: 0,
      })
    }
  }

}
