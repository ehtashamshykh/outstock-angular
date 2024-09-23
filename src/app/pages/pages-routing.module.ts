import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout Page',
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account Page',
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
    title: 'New Password',
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    title: 'Order-Details',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {}
