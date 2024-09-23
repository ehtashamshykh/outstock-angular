import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { HomeFourComponent } from './home-four/home-four.component';



@NgModule({
  declarations: [
    HomeFourComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ShopModule,
  ]
})
export class HomeModule { }
