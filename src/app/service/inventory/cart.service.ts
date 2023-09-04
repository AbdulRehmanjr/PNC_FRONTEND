import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/class/inventory/cart';
import { Cartitem } from 'src/app/class/inventory/cartitem';
import { Product } from 'src/app/class/inventory/product';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #url: string = `${environment.baseUrl}/${environment.cart}`;
  #payement: string = `${environment.baseUrl}/${environment.checkout}`;
  private cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cart: Cart;

  constructor(private http: HttpClient) {
    this.cart = JSON.parse(localStorage.getItem('cart')) || new Cart();
    this.cart.userEmail = JSON.parse(localStorage.getItem('user'))['userEmail'];
    this.updateCartCount();
  }

  addToCart(product: Product) {
    const existingCartItem = this.cart.cartItems.find(
      (item) => item.productName === product.name
    );

    if (existingCartItem) {
      if (existingCartItem.productQuantity < 5) {
        existingCartItem.productQuantity += 1;
      } else {
        console.log('Maximum quantity for this product reached.');
        return;
      }
    } else {
      if (this.cart.cartItems.length < 5) {
        const cartItem = new Cartitem();

        cartItem.productId = product.productId;
        cartItem.productCode = product.code;
        cartItem.productName = product.name;
        cartItem.productPrice = product.price;
        cartItem.productPic = product.images[0];
        cartItem.productQuantity = 1;
        cartItem.productCategory = product.category.categoryId;
        cartItem.sellerId = product.seller.sellerId;

        this.cart.cartItems.push(cartItem);
      } else {
        console.log('Maximum number of unique products in cart reached.');
        return;
      }
    }

    this.updateCartCount();
    this.storeCartData();
  }

  private updateCartCount() {
    const count = this.cart.cartItems.reduce(
      (total, item) => total + item.productQuantity,
      0
    );
    this.cartCount.next(count);
  }

  getCountOfCart$() {
    return this.cartCount.asObservable();
  }

  getCart() {
    return this.cart;
  }
  updateCartData() {
    this.updateCartCount();
    this.storeCartData();
  }
  private storeCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // saveCart(){
  //   return this.http.post(`${this.#url}/save/${this.cart.userEmail}`,this.cart.cartItems,{observe:'body'})
  // }
  saveCart() {
    console.log(this.cart);
    return this.http.post(`${this.#url}/save`, this.cart, { observe: 'body' });
  }

  orderPayment() {
    return this.http.post(`${this.#payement}/order`, this.cart, {
      observe: 'body',
      responseType: 'text',
    });
  }
}
