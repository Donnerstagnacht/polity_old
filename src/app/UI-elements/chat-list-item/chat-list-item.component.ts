import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Chat {
  room_id: string,
  participant_id: string,
  name: string,
  last_message_time: Date,
  last_message: string,
  avatar_url: string,
  number_of_unread_messages: number,
  is_group: boolean
}

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent implements OnInit {
  @Input() chat!: Chat;
  showTime: boolean = false;
  unreadMessagesAsString: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkIfMessageReceivedToday();
    this.convertNumberToString();
  }

  openProfile(id: string) {
    this.router.navigate([`profile/${this.chat.participant_id}`]);
  }

  openChat() {
    this.router.navigate([`orga/${this.chat.room_id}`]);
  }

  checkIfMessageReceivedToday(): void {
    const currentDate = new Date().setHours(0,0,0,0);
    const dateOflastMessage = new Date (this.chat.last_message_time).setHours(0,0,0,0);

    if (currentDate === dateOflastMessage) {
      this.showTime = true
    }
  }

  convertNumberToString(): void {
    this.unreadMessagesAsString = this.chat.number_of_unread_messages.toString();
  }

}
