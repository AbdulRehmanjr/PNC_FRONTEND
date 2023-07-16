import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from '../../components/admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard/admin-dashboard.component';


const routes:Routes = [
  {path:'admin-dashboard',component:AdminComponent,children:[
    {path:'',component:AdminDashboardComponent}
  ]}
]
@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminDashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AdminModule { }
