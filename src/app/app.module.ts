import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './shared/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ShopModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
      positionClass:'toast-top-center'
    }),
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: HttpInterceptorInterceptor,
     multi: true
    }
   ],
  bootstrap: [AppComponent]
})

export class AppModule { };
