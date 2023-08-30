import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  #url:string = `${environment.baseUrl}/${environment.seller}`
  constructor(private http:HttpClient) { }

  getAllSellers(){
    return this.http.get(`${this.#url}/all`,{
      observe:'body'
    })
  }
}
