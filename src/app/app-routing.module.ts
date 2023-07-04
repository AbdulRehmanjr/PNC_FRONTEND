import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';
import { GeneralModule } from './module/general/general.module';


const routes:Route[] =[

]
@NgModule({
  declarations: [],
  imports: [
    GeneralModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
