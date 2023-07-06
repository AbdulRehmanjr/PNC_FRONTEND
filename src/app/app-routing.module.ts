import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';
import { GeneralModule } from './module/general/general.module';
import { UserModule } from './module/user/user.module';


const routes:Route[] =[

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
