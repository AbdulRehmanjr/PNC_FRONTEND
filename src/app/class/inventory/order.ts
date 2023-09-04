import { Cart } from "./cart"

export class Order {
  orderId:number
  orderCode:string
  cart:Cart
  customerEmail:string
  amount:number
}
