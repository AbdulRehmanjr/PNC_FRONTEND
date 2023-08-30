import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  {path:'admin-dashboard',component:SellerComponent,children:[

  ]}
]

@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class SellerModule { }
