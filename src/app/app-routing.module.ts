import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';

import { GeneralModule } from './module/general/general.module';
import { UserModule } from './module/user/user.module';


import { AdminModule } from './module/admin/admin.module';
import { SellerModule } from './module/seller/seller.module';


const routes:Route[] =[
  // {path:'home',component:AdminComponent},
  // {path:'',redirectTo:'home',pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    AdminModule,
    UserModule,
    GeneralModule,
    SellerModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
