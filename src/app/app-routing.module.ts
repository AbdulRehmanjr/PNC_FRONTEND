import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';

import { GeneralModule } from './module/general/general.module';
import { UserModule } from './module/user/user.module';


import { CategoryDetailComponent } from './components/general/category-detail/category-detail.component';
import { AdminModule } from './module/admin/admin.module';
import { AdminComponent } from './module/admin/admin.component';


const routes:Route[] =[
  {path:'home',component:AdminComponent},
  {path:'category-detail',component:CategoryDetailComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    AdminModule,
    UserModule,
    GeneralModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
