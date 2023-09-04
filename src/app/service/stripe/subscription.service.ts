import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/class/inventory/cart';
import { Paymentrequest } from 'src/app/class/stripe/paymentrequest';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private url:string = `${environment.baseUrl}/${environment.checkout}`
  constructor(private http:HttpClient) { }

  paymentConfirm(type:string,email:string){

    let payment = new Paymentrequest()
    payment.email = email
    payment.type = type

    return this.http.post(`${this.url}/create-checkout-session`,payment,{
      observe:'body',
      responseType:'text'
    })
  }

}
