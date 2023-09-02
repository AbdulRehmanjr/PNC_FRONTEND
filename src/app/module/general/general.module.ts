import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

//ng prime
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { SkeletonModule } from 'primeng/skeleton';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { SharedModule } from '../shared/shared.module';

import { GeneralComponent } from './general.component';
import { IntroComponent } from '../../components/general/intro/intro.component';
import { CategoryComponent } from '../../components/general/category/category.component';
import { RecentactivityComponent } from 'src/app/components/general/recentactivity/recentactivity.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { SignupComponent } from '../../components/general/signup/signup.component';
import { CategoryDetailComponent } from '../../components/general/category-detail/category-detail.component';
import { BecomesellerComponent } from '../../components/general/seller/becomeseller/becomeseller.component';
import { DashboardComponent } from '../../components/general/dashboard/dashboard.component';
import { AboutComponent } from 'src/app/components/general/about/about.component';
import { TeamComponent } from '../../components/general/team/team.component';
import { PlatformComponent } from '../../components/general/platform/platform.component';
import { AboutUsComponent } from '../../components/general/about-us/about-us.component';
import { StartBusinessComponent } from '../../components/general/seller/start-business/start-business.component';
import { ContactUsComponent } from '../../components/general/contact-us/contact-us.component';
import { SubscriptionCardsComponent } from '../../components/general/subscription-cards/subscription-cards.component';
import { CommunicationComponent } from '../../components/general/communication/communication.component';
import { ProfileComponent } from 'src/app/components/seller/profile/profile.component';


const LOGINPROVIDER = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '656258918400-iurtdgagb9ncghbua23c5m85c3fvcb7v.apps.googleusercontent.com'
        ),
      },
    ],
    onError: (err) => {
      console.error(err);
    },
  } as SocialAuthServiceConfig,
};

const routes: Route[] = [
  {
    path: 'home',
    component: GeneralComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category-detail', component: CategoryDetailComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component:ContactUsComponent},
      { path: 'start-business',component:StartBusinessComponent},
      { path: 'become-seller',component:BecomesellerComponent},
      { path: 'subscription-cards',component:SubscriptionCardsComponent},
      { path:'messages',component:CommunicationComponent},
      { path:'profile/:sellerId',component:ProfileComponent}
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    GeneralComponent,
    IntroComponent,
    CategoryComponent,
    RecentactivityComponent,
    LoginComponent,
    SignupComponent,
    CategoryDetailComponent,
    BecomesellerComponent,
    DashboardComponent,
    AboutComponent,
    TeamComponent,
    PlatformComponent,
    AboutUsComponent,
    StartBusinessComponent,
    ContactUsComponent,
    SubscriptionCardsComponent,
    CommunicationComponent,
  ],
  imports: [
    VirtualScrollerModule,
    DialogModule,
    FileUploadModule,
    SkeletonModule,
    TabViewModule,
    DropdownModule,
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
    RouterModule.forChild(routes),
  ],
  providers: [LOGINPROVIDER, MessageService],
  exports: [RouterModule],
})
export class GeneralModule {}
