import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Chat {
  room_id: string,
  room_name: string,
  last_message_time: string,
  last_message: string,
  avatar_url: string,
  number_of_new_messages: string
}

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss']
})
export class ChatListItemComponent implements OnInit {
  @Input() chat!: Chat;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openProfile(id: string) {
    console.log('profile')
  }

  openChat() {
    console.log('chat' + this.chat.room_id);
    this.router.navigate([`orga/${this.chat.room_id}`]);
  }

}
