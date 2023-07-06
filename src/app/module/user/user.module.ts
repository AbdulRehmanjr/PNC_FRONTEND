import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';


import { ProfileComponent } from '../../components/user/profile/profile.component';


const routes :Route[] = [

]
@NgModule({
  declarations:[
    ProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class UserModule { }
