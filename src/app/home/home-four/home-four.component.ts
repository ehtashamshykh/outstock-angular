import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { EffectFade, Pagination } from 'swiper/modules';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-home-four',
  templateUrl: './home-four.component.html',
  styleUrls: ['./home-four.component.scss'],
})

export class HomeFourComponent {
  @ViewChild('heroSliderContainer') heroSliderContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public trendingProducts: IProduct[] = [];
  public recommendedProducts: IProduct[] = [];
  public perView: number = 10;
  public perViewRecommended: number = 10;
  sliderProducts: IProduct[] = [];

  constructor(private httpRequestService: HttpRequestService) {
    const isLoggedIn = localStorage.getItem('username');
    if(isLoggedIn){
    // get slider data
    this.httpRequestService.getRequest(API_URL, '/products/featured').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.sliderProducts = res
        }
      },
    });

    // get trending products
    this.httpRequestService.getRequest(API_URL, '/products/trending').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.trendingProducts = res
        }
      },
    });

    // get recommended products
    this.httpRequestService.getRequest(API_URL, '/products/recommended').subscribe({
      next: (res: IProduct[]) => {
        if (res) {
          this.recommendedProducts = res
        }
      },
    });
  }
  }

  // handle per view
  handlePerView() {
    this.perView = this.perView + 4;
  }

  // handle per view for recommended
  handlePerViewRecommended() {
    this.perViewRecommended = this.perViewRecommended + 4;
  }

  ngAfterViewInit() {
    if (this.heroSliderContainer) {
      this.swiperInstance = new Swiper('.slider-active', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        effect: 'fade',
        modules: [Pagination, EffectFade],
        pagination: {
          clickable: true,
          el: '.tp-slider-dot',
        },
      });
    }
  }

}
