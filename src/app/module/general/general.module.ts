import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module'

import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';



const routes:Route[] = [
  {path:'',component:GeneralComponent,}
]

@NgModule({
  declarations: [
    GeneralComponent,
    IntroComponent,
    CategoryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class GeneralModule { }
