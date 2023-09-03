import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/class/communication/message';
import { environment } from 'src/app/variables/environment';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  #url: string = `${environment.baseUrl}/${environment.message}`;
  #socket: string = `${environment.baseUrl}/${environment.socket}`;
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private client: CompatClient = Stomp.over(() => new SockJS(this.#socket));
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subscriptions: { [key: string]: any } = {};

  constructor(private http: HttpClient) {
    this.initWebSocket();
  }

  private initWebSocket() {
    console.log('connecting')
    this.client.onStompError = (frame) => {
      console.log('error',frame)
      this.isConnected.next(false);
      this.onConnect();
    };
    this.client.onConnect = (frame) => {
      console.log('connect',frame)
      this.isConnected.next(true);
    };
    this.client.onWebSocketClose = (frame) => {
      console.log('close',frame)
      this.isConnected.next(false);
      this.onConnect();
    };

    console.log('deone?s')
  }
  getAllMessages(userEmail: string, recevierEmail: String) {
    return this.http.get(`${this.#url}/${userEmail}/${recevierEmail}`, {
      observe: 'body',
    });
  }

  connectToUser(connectedId: string) {
    if (this.subscriptions[connectedId]) {
      return;
    }
    const subscription = this.client.subscribe(
      `/userChat/${connectedId}/private`,
      (message: any) => {
        const newMessage: Message = JSON.parse(message.body);
        this.handleNewMessage(newMessage);
        this.readOneMessage(newMessage).subscribe({
          next: (response: boolean) => {},
          error: (errro: any) => {},
          complete: () => {},
        });
      }
    );

    // Store the subscription
    this.subscriptions[connectedId] = subscription;
  }
  private handleNewMessage(newMessage: any) {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, newMessage];
    this.messagesSubject.next(updatedMessages);
  }
  onConnect() {
    this.client.activate();
  }

  sendMessage(data: Message) {
    try {
      console.log(JSON.stringify(data))
      this.client.send('/app/private-message', {}, JSON.stringify(data));
    } catch (error) {
      this.isConnected.next(false);
    }
  }
  readOneMessage(message: Message) {
    const url = `${environment.baseUrl}/${environment.message}`;
    return this.http.post(`${url}/read-message`, message, {
      observe: 'body',
    });
  }
  readAllMessages(from: string, to: string) {
    const url = `${environment.baseUrl}/${environment.message}`;
    return this.http.post(
      `${url}/read-messages/${from}/${to}`,
      {},
      {
        observe: 'body',
      }
    );
  }
  disconect(receiverId: string) {
    if (this.subscriptions[receiverId]) {
      this.subscriptions[receiverId].unsubscribe();
      delete this.subscriptions[receiverId];
    }
  }
  onDisconnect() {
    this.client.disconnect();
  }

  getMessages() {
    return this.messagesSubject;
  }

  getConnectionStatus() {
    return this.isConnected.asObservable();
  }
}
