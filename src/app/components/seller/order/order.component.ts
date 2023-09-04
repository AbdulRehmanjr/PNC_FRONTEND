import { Component } from '@angular/core';
import { Cartitem } from 'src/app/class/inventory/cartitem';
import { Order } from 'src/app/class/inventory/order';
import { OrderService } from 'src/app/service/inventory/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrdersByUserEmail();
  }

  fetchOrdersByUserEmail() {
    const sellerId = JSON.parse(localStorage.getItem('seller'))['sellerId'];

    this.orderService.fetchOrderBySellerId(sellerId).subscribe({
      next: (response: Order[]) => {
        this.orders = response;
        console.log(response);
      },
      error: (err: any) => console.log(err),
      complete: () => {
        this.orders = this.orders.filter((order: Order) => {
          return order.cart.cartItems.some((item: Cartitem) => {
            return item.sellerId === 2;
          });
        }).map((order: Order) => {
          return {
            ...order,
            cart: {
              ...order.cart,
              cartItems: order.cart.cartItems.filter((item: Cartitem) => {
                return item.sellerId === 2;
              }),
            },
          };
        });

      },
    });
  }
}
