import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule, Routes } from '@angular/router';
import { Chatuserlist } from 'src/app/class/communication/chatuserlist';
import { Seller } from 'src/app/class/seller/seller';
import { ChatuserlistService } from 'src/app/service/communication/chatuserlist.service';
import { SellerService } from 'src/app/service/seller/seller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {


  sellerId: number = 0;
  seller: Seller;
  isSeller: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private sellerService: SellerService,
    private chatListService:ChatuserlistService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getId()
    this.fetchSellerInfo();
  }

  getId() {
    this.sellerId = +this.activeRoute.snapshot.paramMap.get('sellerId');
    if (this.sellerId == 0) {
      this.isSeller = true;
      this.sellerId = JSON.parse(localStorage.getItem('seller'))['sellerId'];
    }
  }

  fetchSellerInfo() {
    this.sellerService.getSellerById(this.sellerId).subscribe({
      next: (response: Seller) => (this.seller = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  sendMessage(){

    const user = JSON.parse(localStorage.getItem('user'))
    let chat = new Chatuserlist()

    chat.sendToName = this.seller.firstName+this.seller.lastName
    chat.sendToEmail = this.seller.email
    chat.sendToPic =  this.seller.picture

    chat.sendByName = user['firstName']+user['lastName']
    chat.sendByEmail = user['userEmail']
    chat.sendByPic = user['photoUri']

    this.chatListService.addToMessageList(chat).subscribe({
      next: (response: any) => {},
      error: (err: any) => console.log(err),
      complete: () => {
        this.router.navigate(['/home/messages'])
      }
    })
  }
}
