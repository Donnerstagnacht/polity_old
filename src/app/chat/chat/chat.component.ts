import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ChatService as ChatServiceStore } from '../state/chat.service';
import { Chat } from '../state/chat.model';
import { orgaeMenuitems, orgaMenuitemsMega } from '../state/orgaMenuItems';
import { ChatQuery } from '../state/chat.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  menuItems: MenuItem[] = orgaeMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;

  groupFilterOn: boolean = false;
  searchTerm: string = '';

  chats$ = new Observable<Chat[]>();

  constructor(
    private chatQuery: ChatQuery,
    private chatServiceStore: ChatServiceStore) { }

  ngOnInit(): void {
    this.chatServiceStore.selectAllRoomsOfUser();
    this.chats$ = this.chatQuery.allChats$;
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.chats$ = this.chatQuery.filterData(this.searchTerm, this.groupFilterOn);
  }

  setGroupFilter(): void {
    this.groupFilterOn = !this.groupFilterOn;
    this.chats$ = this.chatQuery.filterData(this.searchTerm, this.groupFilterOn);
  }

}
