import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';

import { GeneralModule } from './module/general/general.module';
import { UserModule } from './module/user/user.module';


import { CategoryDetailComponent } from './components/general/category-detail/category-detail.component';


const routes:Route[] =[
  {path:'category-detail',component:CategoryDetailComponent}
]
@NgModule({
  declarations: [],
  imports: [
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
