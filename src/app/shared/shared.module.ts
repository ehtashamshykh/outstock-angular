import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { NavManusComponent } from './header/header-com/nav-manus/nav-manus.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ClientSliderComponent } from './components/slider/client-slider/client-slider.component';
import { HeroSliderTwoComponent } from './components/slider/hero-slider-two/hero-slider-two.component';
import { HomeThreeTestimonialComponent } from './components/testimonial/home-three-testimonial/home-three-testimonial.component';
import { MiniCartComponent } from './header/header-com/mini-cart/mini-cart.component';
import { ExtraInfoComponent } from './header/header-com/extra-info/extra-info.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import { HeaderThreeComponent } from './header/header-three/header-three.component';
import { SearchPopupComponent } from './header/header-com/search-popup/search-popup.component';
import { HeaderFourComponent } from './header/header-four/header-four.component';
import { HomeSevenTestimonialComponent } from './components/testimonial/home-seven-testimonial/home-seven-testimonial.component';
import { VideoPopupComponent } from './components/modals/video-popup/video-popup.component';
import { BreadcrumbOneComponent } from './components/breadcrumb/breadcrumb-one/breadcrumb-one.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { ProductDetailsUpperComponent } from './components/product-details-upper/product-details-upper.component';
import { ReviewFormComponent } from './components/forms/review-form/review-form.component';
import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { MaterialModule } from './material.module';
import { DeleteUserModalComponent } from './components/modals/delete-user/delete-user-modal.component';
import { CategoryFilterComponent } from './components/filtering/category-filter/category-filter.component';
import { PriceFilterComponent } from './components/filtering/price-filter/price-filter.component';
import { SizeFilteringComponent } from './components/filtering/size-filtering/size-filtering.component';
import { BrandFilteringComponent } from './components/filtering/brand-filtering/brand-filtering.component';
import { ColorFilteringComponent } from './components/filtering/color-filtering/color-filtering.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SellerFilteringComponent } from './components/filtering/seller-filtering/seller-filtering.component';
import { ForgotPasswordModalComponent } from './components/modals/forgot-password-modal/forgot-password-modal.component';
import { SubscribeAreaComponent } from './components/subscribe-area/subscribe-area.component';
import { PaymentModalComponent } from './components/modals/payment-modal/payment-modal.component';
import { TrackOrderModalComponent } from './components/modals/track-order-modal/track-order-modal.component';
import { TooltipDirective } from './directives/tooltip.directive';


@NgModule({
  declarations: [
    HeaderOneComponent,
    NavManusComponent,
    SubscribeAreaComponent,
    BackToTopComponent,
    ClientSliderComponent,
    HeroSliderTwoComponent,
    HomeThreeTestimonialComponent,
    MiniCartComponent,
    ExtraInfoComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    SearchPopupComponent,
    HeaderFourComponent,
    HomeSevenTestimonialComponent,
    VideoPopupComponent,
    BreadcrumbOneComponent,
    PaginationComponent,
    ProductDetailsUpperComponent,
    ReviewFormComponent,
    ProductModalComponent,
    OffcanvasComponent,
    ConfirmationModalComponent,
    DeleteUserModalComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    SizeFilteringComponent,
    ColorFilteringComponent,
    BrandFilteringComponent,
    SellerFilteringComponent,
    ForgotPasswordModalComponent,
    PaymentModalComponent,
    TrackOrderModalComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSliderModule
  ],
  exports:[
    HeaderOneComponent,
    SubscribeAreaComponent,
    BackToTopComponent,
    ClientSliderComponent,
    HeroSliderTwoComponent,
    HomeThreeTestimonialComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    HomeSevenTestimonialComponent,
    VideoPopupComponent,
    BreadcrumbOneComponent,
    PaginationComponent,
    ProductDetailsUpperComponent,
    ReviewFormComponent,
    ProductModalComponent,
    OffcanvasComponent,
    ConfirmationModalComponent,
    DeleteUserModalComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    SizeFilteringComponent,
    ColorFilteringComponent,
    BrandFilteringComponent,
    SellerFilteringComponent,
    ForgotPasswordModalComponent,
    MaterialModule,
    PaymentModalComponent,
    TrackOrderModalComponent,
    TooltipDirective
  ]
})
export class SharedModule { }
