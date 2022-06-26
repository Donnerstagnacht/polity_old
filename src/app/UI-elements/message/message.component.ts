import { Component, Input, OnInit } from '@angular/core';

export interface Message {
  sender: string,
  content: string,
  send_time: string
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  @Input() messageOfLoggedInUser: boolean = true;
  @Input() showSender: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this. message = {
      sender: 'Tobias Hassebrock',
      content: 'Wie geht es dir so?',
      send_time: '12:26'
    }
  }

}
