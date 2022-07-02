import { Component, Input, OnInit } from '@angular/core';

export interface Message {
  message_id: string,
  created_at_in: string
  sender_id: string,
  content_in: string
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  @Input() showSender: boolean = false;
  @Input() loggedInUserId: string | undefined = '';
  messageOfLoggedInUser: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.checkIfMessageFromLoggedInUser();
  }

  checkIfMessageFromLoggedInUser(): void {
    if(this.loggedInUserId === this.message.sender_id) {
      this.messageOfLoggedInUser = true;
    }
  }

}
