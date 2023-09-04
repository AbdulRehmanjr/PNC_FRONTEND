import { Component } from '@angular/core';
import { Cart } from 'src/app/class/inventory/cart';
import { Cartitem } from 'src/app/class/inventory/cartitem';
import { CartService } from 'src/app/service/inventory/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  cartCount: number = 0;
  shipping: number = 300;
  cart: Cart;
  #subTotal: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartCount()
    this.fetchCart();
  }

  getCartCount() {
    this.cartService.getCountOfCart$().subscribe({
      next: (response: any) => (this.cartCount = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }
  fetchCart() {
    this.cart = this.cartService.getCart();
  }

  subTotal() {
    this.#subTotal = this.cart?.cartItems.reduce(
      (total, item) => total + item.productQuantity * item.productPrice,
      0
    );
    return this.#subTotal;
  }

  grandTotal() {
    return this.#subTotal + this.shipping
  }

  decrement(item: Cartitem) {
    if (item.productQuantity > 1) {
      item.productQuantity -= 1;
      this.cartService.updateCartData();
    }
  }

  increment(item: Cartitem) {
    if (item.productQuantity < 5) {
      item.productQuantity += 1;
      this.cartService.updateCartData();
    }
  }

  makeOrder(){
    this.cartService.saveCart().subscribe({
      next: (response: Cart) => console.log(response),
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
