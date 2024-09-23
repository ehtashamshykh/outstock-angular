import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFourComponent } from './home-four/home-four.component';


const routes: Routes = [
  {
    path: '',
    component: HomeFourComponent,
    title: 'Home page four',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
