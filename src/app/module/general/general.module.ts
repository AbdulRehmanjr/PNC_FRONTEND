import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module'

import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';
import { RecentactivityComponent } from 'src/app/components/general/recentactivity/recentactivity.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';





const routes:Route[] = [
  {path:'',component:GeneralComponent,},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
]

@NgModule({
  declarations: [
    GeneralComponent,
    IntroComponent,
    CategoryComponent,
    RecentactivityComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class GeneralModule { }
