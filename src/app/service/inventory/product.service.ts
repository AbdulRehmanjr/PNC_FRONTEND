import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/class/inventory/product';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  #url: string = `${environment.baseUrl}/${environment.product}`;

  constructor(private http: HttpClient) {}

  saveProduct(product: Product, files: File[]) {
    let formData = new FormData();
    formData.append('productStr', JSON.stringify(product));
    for (const file of files) {
      formData.append('pictures', file);
    }
    return this.http.post(`${this.#url}/save`, formData, {
      observe: 'body',
    });
  }

  getProductsBySellerId(sellerId:number){
    return this.http.get(`${this.#url}/seller/${sellerId}`,{observe:'body'})
  }
}
