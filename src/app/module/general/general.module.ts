import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';


//ng prime
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';

import { SharedModule } from '../shared/shared.module'

import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';
import { RecentactivityComponent } from 'src/app/components/general/recentactivity/recentactivity.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
import { CategoryDetailComponent } from '../../components/general/category-detail/category-detail.component';

const LOGINPROVIDER = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: true,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '656258918400-iurtdgagb9ncghbua23c5m85c3fvcb7v.apps.googleusercontent.com'
        )
      },
    ],
    onError: (err) => {
      console.error(err);
    }
  } as SocialAuthServiceConfig,
}



const routes:Route[] = [
  {path:'',component:GeneralComponent},
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
    SignupComponent,
    CategoryDetailComponent
  ],
  imports: [
    SocialLoginModule,
    TagModule,
    ChipModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    LOGINPROVIDER
  ],
  exports:[
    RouterModule
  ]
})
export class GeneralModule { }
