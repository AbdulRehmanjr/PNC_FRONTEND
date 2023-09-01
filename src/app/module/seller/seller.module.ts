import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule, Routes } from '@angular/router';

// ng prime
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';

import { ConfirmationService } from 'primeng/api';

import { SellerSideBarComponent } from '../../components/seller/seller-side-bar/seller-side-bar.component';
import { SellerDashboardComponent } from '../../components/seller/seller-dashboard/seller-dashboard.component';
import { SellerHeaderComponent } from '../../components/seller/seller-header/seller-header.component';
import { CommunicationComponent } from 'src/app/components/general/communication/communication.component';
import { InventoryComponent } from '../../components/seller/inventory/inventory.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../../components/seller/profile/profile.component';
import { CapitalizePipe } from 'src/app/pipe/capitalize.pipe';



const routes: Routes = [
  {
    path: 'seller-dashboard',
    component: SellerComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path:'messages',component:CommunicationComponent},
      { path:'inventory',component:InventoryComponent},
      { path:'profile',component:ProfileComponent}
  ],
  },
];

@NgModule({
  declarations: [
    CapitalizePipe,
    SellerComponent,
    SellerSideBarComponent,
    SellerDashboardComponent,
    SellerHeaderComponent,
    InventoryComponent,
    ProfileComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RatingModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    AvatarModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    ChartModule,
    BadgeModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers:[ConfirmationService],
  exports: [RouterModule],
})
export class SellerModule {}
