import { Component } from '@angular/core';
import { Seller } from 'src/app/class/seller';
import { Sellerrequest } from 'src/app/class/sellerrequest';
import { SellerService } from 'src/app/service/seller/seller.service';

@Component({
  selector: 'app-seller-report',
  templateUrl: './seller-report.component.html',
  styleUrls: ['./seller-report.component.css']
})
export class SellerReportComponent {
  isAccepted: boolean;
  selectedSeller: Seller;
  sellers: Seller[];

  constructor(
    private sellerService: SellerService
  ) {}
  ngOnInit() {
    this.fetchRequests();
  }
  fetchRequests() {
    this.sellerService.getAllSellers().subscribe({
      next: (response: Seller[]) => {
        this.sellers = response;
      },
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  getValue(status:boolean) {

    switch (status) {
      case true:
        return "Active"
      case false:
        return "Blocked"
      default:
        return "Blocked"
    }
  }

  getSeverity(status:boolean) {
    switch (status) {
      case true:
        return "success"
      case false:
        return "danger"
      default:
        return "danger"
    }
  }
}
