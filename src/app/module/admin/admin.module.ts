import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//* ng modules
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';

//* compoenents
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from '../../components/admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard/admin-dashboard.component';
import { SellerrequestsComponent } from '../../components/admin/sellerrequests/sellerrequests.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from '../../components/admin/add-category/add-category.component';



const routes:Routes = [
  {path:'admin-dashboard',component:AdminComponent,children:[
    {path:'',component:AdminDashboardComponent},
    {path:'requests',component:SellerrequestsComponent},
    {path:'category',component:AddCategoryComponent}
  ]}
]
@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    SellerrequestsComponent,
    AddCategoryComponent
  ],
  imports: [
    BadgeModule,
    ToolbarModule,
    ReactiveFormsModule,
    DialogModule,
    TagModule,
    TableModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AdminModule { }
