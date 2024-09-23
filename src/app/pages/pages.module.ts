import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    AccountComponent,
    NotFoundComponent,
    NewPasswordComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
