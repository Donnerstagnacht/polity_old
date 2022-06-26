import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Chat } from 'src/app/UI-elements/chat-list-item/chat-list-item.component';
import { orgaeMenuitems, orgaMenuitemsMega } from '../services/orgaMenuItems';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  menuItems: MenuItem[] = orgaeMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;

  groupFilterOn: boolean = false;

  chatList: Chat[] = []

  constructor() { }

  ngOnInit(): void {
    this.chatList = [
      {
        room_id: 'sdfdfdf',
        room_name: 'Tobias Hassebrock',
        last_message: 'Wie geht es voran?',
        last_message_time:  '12:34',
        avatar_url: 'sdfdff',
        number_of_new_messages: '3'
      }
    ]
  }

  onSearch(searchTerm: string): void {

  }

  setGroupFilter(): void {
    this.groupFilterOn = !this.groupFilterOn;
  }

}
