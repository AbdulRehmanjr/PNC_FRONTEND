import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Chatuserlist } from 'src/app/class/chatuserlist';
import { ChatuserlistService } from 'src/app/service/communication/chatuserlist.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent {

  chatList:Chatuserlist[]

  constructor(private chatListService:ChatuserlistService){}

  ngOnInit(){
    this.fetchUserChatList()
  }

  fetchUserChatList(){
    const senderEmail = JSON.parse(localStorage.getItem('user'))['userEmail']

    this.chatListService.getChatList(senderEmail).subscribe({
      next: (response: Chatuserlist[]) => this.chatList= response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
