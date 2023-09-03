
import { Component } from '@angular/core';
import { Chatuserlist } from 'src/app/class/communication/chatuserlist';
import { Message } from 'src/app/class/communication/message';
import { ChatuserlistService } from 'src/app/service/communication/chatuserlist.service';
import { MessageService } from 'src/app/service/communication/message.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent {

  oldMessages: Message[]
  messages:any[]
  chatList:Chatuserlist[]
  sender:any = ''
  isClicked: boolean = false
  selectedUserEmail: string
  selectedUserPic:string
  isConnected:boolean = false

  constructor(private chatListService:ChatuserlistService,private messageService:MessageService){}

  ngOnInit(){
    this.sender = JSON.parse(localStorage.getItem('user'))
    this.fetchUserChatList()
    this.messageService.onConnect()
    this.receiveMessages()
    this.connectionStatus()
  }

  /**
   * The `status()` function checks the connection status and displays a warning message if there is a
   * connection error.
   */
  connectionStatus() {
    this.messageService.getConnectionStatus().subscribe({
      next: (response: boolean) => {
        this.isConnected = response
        if (response === false)
         console.error('===>not connection')
      }
    })
  }

  /**
   * The function fetches the chat list for a user by retrieving the sender's email from local storage
   * and making a request to the chat list service.
   */
  fetchUserChatList(){
    this.chatListService.getChatList(this.sender['userEmail']).subscribe({
      next: (response: Chatuserlist[]) => this.chatList= response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  /**
   * The function sends a message by creating a new Message object, setting its properties, and pushing
   * it to the messages array if the current user is the sender or recipient.
   * @param {Event}  - The  parameter is an event object that is passed to the function
   * when an event is triggered. It contains information about the event, such as the target element
   * and any additional data associated with the event.
   * @param {any} data - The `data` parameter is an object that contains the value of the message that
   * is being sent.
   * @returns The function does not have an explicit return statement.
   */
  sendMessage($event: Event, data: any) {

    $event.preventDefault()

    if (data.value == '')
      return

    const message = new Message();
    message.content = data.value;
    message.senderEmail = this.sender['userEmail'];
    message.recevierEmail = this.selectedUserEmail;

    const time = new Date().toLocaleTimeString().toString()
    message.Date = time;
    message.type = 'SENDER';

    data.value = '';

    //* Only push the sent message if the current user is the sender or recipient
    if (this.isConnected == true) {
      if (message.senderEmail === this.sender['userEmail']) {
        const updatedMessages = [...this.messages, message];
        this.messages = updatedMessages
        this.messageService.sendMessage(message)
      }
    }
  }

  /**
   * The function `receiveMessages()` subscribes to the `getMessages()` method of the `chatService` and
   * assigns the response to the `messages` variable.
   */
  receiveMessages(){
    this.messageService.getMessages().subscribe({
      next: (response: any[]) => {
          this.messages = response
      },
      error: (error: any) => console.log(error),
      complete: () => console.log()
    })
  }

  /**
   * The fetchMessage function retrieves all messages between the current user and the selected user,
   * updates the message type based on the receiver, and scrolls to the bottom of the chat.
   */
  fetchMessage() {

    this.messageService.getAllMessages(this.sender['userEmail'], this.selectedUserEmail).subscribe({

      next: (response: Message[]) => this.oldMessages = response,
      error: (error: any) => console.log(error),
      complete: () => {
        this.oldMessages.forEach(
          message => {
            if (message.recevierEmail == this.sender['userEmail']) {
              message.type = 'RECEIVER'
            }
          }
        )
       //this.scrollToBottom()
      }
    })
  }


  /**
   * The function `selectUser` is used to select a user from a chat user list and perform various
   * actions related to messaging, such as connecting to the user, fetching messages, marking messages
   * as read, and updating the unread count.
   * @param {Chatuserlist} user - The parameter "user" is of type "Chatuserlist".
   */
  selectUser(user: Chatuserlist) {
    this.isClicked = !this.isClicked;
    this.selectedUserEmail = user.sendToEmail
    this.selectedUserPic = user.sendToPic
    const values = []
    this.messages = []
    this.messageService.connectToUser(this.selectedUserEmail)
    this.fetchMessage()
    this.markMessagesAsRead(this.sender['userEmail'],this.selectedUserEmail)
  }

  /**
   * The function "markMessagesAsRead" calls a service method to mark all messages between two users as
   * read.
   * @param {string} from - The "from" parameter represents the sender of the messages.
   * @param {string} to - The "to" parameter represents the recipient of the messages.
   */
  markMessagesAsRead(from:string,to:string) {
    this.messageService.readAllMessages(from,to).subscribe()
  }
}

