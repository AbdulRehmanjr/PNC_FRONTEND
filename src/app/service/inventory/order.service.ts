import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  #url:string = `${environment.baseUrl}/${environment.order}`

  constructor(private http:HttpClient) { }

  fetchOrderByUserEmail(email:string){
    return this.http.get(`${this.#url}/${email}`,{observe:'body'})
  }

  fetchOrderBySellerId(sellerId:number){
    return this.http.get(`${this.#url}/seller/${sellerId}`,{observe:'body'})
  }


}
