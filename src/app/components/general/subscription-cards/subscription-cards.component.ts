import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-cards',
  templateUrl: './subscription-cards.component.html',
  styleUrls: ['./subscription-cards.component.css'],
})
export class SubscriptionCardsComponent {
  displayDialog: boolean = false;

  // constructor(private sellerService: SellerService,private stripeService:PaymentService) {
  // }

  buySubscription(type: string) {
    // const role = JSON.parse(localStorage.getItem('user'))['authority'];

    // if (role == 'SELLER') {
    //   const email = JSON.parse(localStorage.getItem('user'))['email'];
    //   this.stripeService.paymentConfirm(type, email).subscribe({
    //     next: (response: any) => {
    //       window.location.href = response;
    //     },
    //     error: (_err: any) => {},
    //     complete: () => {},
    //   });
    // } else {
    // }
  }

  hideDialog() {
    this.displayDialog = false;
  }
  showDialog() {
    this.displayDialog = true;
  }
}
