import { Component } from '@angular/core';
import { Order } from 'src/app/class/inventory/order';
import { OrderService } from 'src/app/service/inventory/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  orders:Order[]

  constructor(private orderService:OrderService){}

  ngOnInit(){
    this.fetchOrdersByUserEmail()
  }

  fetchOrdersByUserEmail(){
    const email = JSON.parse(localStorage.getItem('user'))['userEmail']

    this.orderService.fetchOrderByUserEmail(email).subscribe({
      next: (response: Order[]) =>this.orders = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
