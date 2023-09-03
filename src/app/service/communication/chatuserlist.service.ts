import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chatuserlist } from 'src/app/class/communication/chatuserlist';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatuserlistService {

  #url:string = `${environment.baseUrl}/${environment.chatlist}`

  constructor(private http:HttpClient) { }

  addToMessageList(chatUser:Chatuserlist){
    return this.http.post(`${this.#url}/add`,chatUser,{observe:'body'})
  }

  getChatList(senderEmail:string){
    return this.http.get(`${this.#url}/${senderEmail}`,{observe:'body'})
  }
}
