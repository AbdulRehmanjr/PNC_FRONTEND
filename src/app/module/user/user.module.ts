import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';


import { ProfileComponent } from '../../components/user/profile/profile.component';
import { FriendsComponent } from '../../components/user/friends/friends.component';
import { PostsComponent } from '../../components/user/posts/posts.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { AvatarModule } from 'primeng/avatar';


const routes: Route[] = [
  {path:'user',component:UserComponent,children:[
    {path:'profile',component:ProfileComponent},
    {path:'',redirectTo:'profile',pathMatch:'full'}
  ]}
]
@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    PostsComponent,
    UserComponent
  ],
  imports: [
    AvatarModule,
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UserModule { }
