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

  /**
   * The function `getSellerById` retrieves a seller's information by their ID using an HTTP GET
   * request.
   * @param {number} sellerId - The sellerId parameter is a number that represents the unique
   * identifier of a seller.
   * @returns an HTTP GET request to the specified URL with the sellerId as a parameter. The response
   * from the request is being returned.
   */
  /**
   * The function `getSellerById` retrieves a seller's information by their ID using an HTTP GET
   * request.
   * @param {number} sellerId - The sellerId parameter is a number that represents the unique
   * identifier of a seller.
   * @returns an HTTP GET request to the specified URL with the sellerId as a parameter. The response
   * from the request is being observed and returned.
   */
  getSellerById(sellerId:number){
    return this.http.get(`${this.#url}/${sellerId}`,{observe:'body'})
  }

  /**
   * The function `getSellerByEmail` retrieves a seller's information by their email address.
   * @param {string} email - A string representing the email address of the seller.
   * @returns The `getSellerByEmail` function is returning an HTTP GET request to the specified URL
   * with the provided email as a parameter. The response from the request is being observed and
   * returned.
   */
  getSellerByEmail(email:string){
    return this.http.get(`${this.#url}/email/${email}`,{observe:'body'})
  }
}
