import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route,RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';


//ng prime
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {ToastModule} from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

import { MessageService } from 'primeng/api';

import { SharedModule } from '../shared/shared.module'


import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';
import { RecentactivityComponent } from 'src/app/components/general/recentactivity/recentactivity.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
import { CategoryDetailComponent } from '../../components/general/category-detail/category-detail.component';
import { BecomesellerComponent } from '../../components/general/seller/becomeseller/becomeseller.component';

const LOGINPROVIDER = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
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
  {path:'home',component:GeneralComponent},
  {path:'become-seller',component:BecomesellerComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
]

@NgModule({
  declarations: [
    GeneralComponent,
    IntroComponent,
    CategoryComponent,
    RecentactivityComponent,
    LoginComponent,
    SignupComponent,
    CategoryDetailComponent,
    BecomesellerComponent
  ],
  imports: [
    PasswordModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    ToastModule,
    TagModule,
    ChipModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    LOGINPROVIDER,
    MessageService
  ],
  exports:[
    RouterModule,

  ]
})
export class GeneralModule { }
