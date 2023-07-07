import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';


import { ProfileComponent } from '../../components/user/profile/profile.component';
import { FriendsComponent } from '../../components/user/friends/friends.component';
import { PostsComponent } from '../../components/user/posts/posts.component';


const routes: Route[] = [
  {
    path: 'userprofile', component: ProfileComponent, children: [
      { path: 'friends', component: FriendsComponent },
      {path:'',component:PostsComponent}
    ]
  }
]
@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    PostsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UserModule { }
