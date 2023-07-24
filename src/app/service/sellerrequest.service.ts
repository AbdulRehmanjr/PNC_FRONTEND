import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment';
import { Sellerrequest } from '../class/sellerrequest';

@Injectable({
  providedIn: 'root',
})
export class SellerrequestService {
  private url: string = `${environment.baseUrl}/${environment.sellerrequest}`;

  constructor(private http: HttpClient) {}

  createRequest(sellerInfo: Sellerrequest, picture: File, document: File) {
    let formData = new FormData()
    formData.append('request', JSON.stringify(sellerInfo))
    formData.append('document', document)
    formData.append('picture', picture)

    return this.http.post(`${this.url}/create`, formData, { observe: 'body' })
  }

  getAllRequests() {
    return this.http.get(`${this.url}/all`, { observe: 'body' })
  }

  getRequestsCounting(){
    return this.http.get(`${this.url}/pending`,{ observe: 'body' })
  }
}
