import { Component } from '@angular/core';
import { SellerService } from 'src/app/service/seller/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {


  constructor(private SellerSerive:SellerService){}
  ngOnInit(){
    this.getSellerInfo()
  }

  getSellerInfo(){
    const email = JSON.parse(localStorage.getItem('user'))['userEmail']

    this.SellerSerive.getSellerByEmail(email).subscribe({
      next: (response: any) => localStorage.setItem('seller',JSON.stringify(response)),
      error: (err: any) => console.log(err),
      complete: () => {}
    })

  }
}
