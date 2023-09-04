import { Component } from '@angular/core';
import { SubscriptionService } from 'src/app/service/stripe/subscription.service';

@Component({
  selector: 'app-subscription-cards',
  templateUrl: './subscription-cards.component.html',
  styleUrls: ['./subscription-cards.component.css'],
})
export class SubscriptionCardsComponent {
  displayDialog: boolean = false;

  constructor(private subscription:SubscriptionService){}

  buySubscription(type: string) {
    // const role = JSON.parse(localStorage.getItem('user'))['authority'];
    console.log('Type',type)
    // if (role == 'SELLER') {
      const email = JSON.parse(localStorage.getItem('user'))['userEmail'];
      this.subscription.paymentConfirm(type, email).subscribe({
        next: (response: any) => {
          window.location.href = response;
        },
        error: (_err: any) => {},
        complete: () => {},
      });
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
