import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';


import { ProfileComponent } from '../../components/user/profile/profile.component';
import { FriendsComponent } from '../../components/user/friends/friends.component';


const routes: Route[] = [
  {
    path: 'userprofile', component: ProfileComponent, children: [
      { path: '', component: FriendsComponent }
    ]
  }
]
@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UserModule { }
