import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule, Routes } from '@angular/router';
import { SellerSideBarComponent } from '../../components/seller/seller-side-bar/seller-side-bar.component';
import { SellerDashboardComponent } from '../../components/seller/seller-dashboard/seller-dashboard.component';
import { SellerHeaderComponent } from '../../components/seller/seller-header/seller-header.component';
import { CommunicationComponent } from 'src/app/components/general/communication/communication.component';


// ng prime
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';


const routes: Routes = [
  {
    path: 'seller-dashboard',
    component: SellerComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      {path:'messages',component:CommunicationComponent}
  ],
  },
];

@NgModule({
  declarations: [
    SellerComponent,
    SellerSideBarComponent,
    SellerDashboardComponent,
    SellerHeaderComponent,
  ],
  imports: [
    ChartModule,
    BadgeModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class SellerModule {}
