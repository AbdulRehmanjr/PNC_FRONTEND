import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module'

import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';
import { RecentactivityComponent } from 'src/app/components/general/recentactivity/recentactivity.component';



const routes:Route[] = [
  {path:'',component:GeneralComponent,}
]

@NgModule({
  declarations: [
    GeneralComponent,
    IntroComponent,
    CategoryComponent,
    RecentactivityComponent
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
