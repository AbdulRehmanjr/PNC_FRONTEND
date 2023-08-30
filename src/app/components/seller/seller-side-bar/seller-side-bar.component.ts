import { Component } from '@angular/core';
import { SellerrequestService } from 'src/app/service/seller/sellerrequest.service';

@Component({
  selector: 'seller-seller-side-bar',
  templateUrl: './seller-side-bar.component.html',
  styleUrls: ['./seller-side-bar.component.css']
})
export class SellerSideBarComponent {
  requestsPending:number

  constructor(private requestService:SellerrequestService){}

  ngOnInit(){
    this.fetchCounts()
  }

  fetchCounts(){
    this.requestService.getRequestsCounting().subscribe({
      next: (response: number) => this.requestsPending = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
