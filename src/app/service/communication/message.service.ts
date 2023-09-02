import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/class/communication/message';
import { environment } from 'src/app/variables/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  #url:string = `${environment.baseUrl}/${environment.message}`
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private currentUserId: string = '';
  private currentReceiverId: string = '';
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private socket: Socket) {
    this.currentUserId = JSON.parse(localStorage.getItem('user'))['userEmail'];
    this.initWebSocket();
  }

  getAllMessages(userEmail: string, recevierEmail: String) {

    return this.http.get(`${this.#url}/${userEmail}/${recevierEmail}`, {
      observe: 'body',
    });
  }

  private initWebSocket() {
    this.socket.fromEvent('connect').subscribe(() => {
      this.isConnected.next(true);
    });

    this.socket.fromEvent('disconnect').subscribe(() => {
      this.isConnected.next(false);
    });

    this.socket.fromEvent('error').subscribe(() => {
      this.isConnected.next(false);
    });
  }

  connectToUser(connectedId: string) {
    this.socket
      .fromEvent(`/userChat/${connectedId}/private`)
      .subscribe((newMessage: any) => {
        this.handleNewMessage(newMessage);
        this.readOneMessage(newMessage).subscribe({
          next: (response: boolean) => {},
          error: (error: any) => {},
          complete: () => {},
        });
      });
  }

  private handleNewMessage(newMessage: any) {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, newMessage];
    this.messagesSubject.next(updatedMessages);
  }

  sendMessage(data: Message) {
    this.socket.emit('/app/private-message', data);
  }

  readOneMessage(message: Message): Observable<any> {
    const url = `${environment.baseUrl}/${environment.message}`;
    return this.http.post(`${url}/read-message`, message, { observe: 'body' });
  }

  readAllMessages(from: string, to: string): Observable<any> {
    const url = `${environment.baseUrl}/${environment.message}`;
    return this.http.post(
      `${url}/read-messages/${from}/${to}`,
      {},
      { observe: 'body' }
    );
  }

  disconnect() {
    this.socket.disconnect();
  }

  getMessages() {
    return this.messagesSubject;
  }

  getConnectionStatus() {
    return this.isConnected.asObservable();
  }
}
