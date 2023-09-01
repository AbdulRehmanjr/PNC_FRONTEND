import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule, Routes } from '@angular/router';

// ng prime
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';

import { ConfirmationService } from 'primeng/api';

import { SellerSideBarComponent } from '../../components/seller/seller-side-bar/seller-side-bar.component';
import { SellerDashboardComponent } from '../../components/seller/seller-dashboard/seller-dashboard.component';
import { SellerHeaderComponent } from '../../components/seller/seller-header/seller-header.component';
import { CommunicationComponent } from 'src/app/components/general/communication/communication.component';
import { InventoryComponent } from '../../components/seller/inventory/inventory.component';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'seller-dashboard',
    component: SellerComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      {path:'messages',component:CommunicationComponent},
      {path:'inventory',component:InventoryComponent}
  ],
  },
];

@NgModule({
  declarations: [
    SellerComponent,
    SellerSideBarComponent,
    SellerDashboardComponent,
    SellerHeaderComponent,
    InventoryComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RatingModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    SliderModule,
    ProgressBarModule,
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
