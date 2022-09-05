import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { ChatService as ChatServiceStore } from '../state/chat.service';
import { Chat } from '../state/chat.model';
import { orgaeMenuitems, orgaMenuitemsMega } from '../state/orgaMenuItems';
import { ChatQuery } from '../state/chat.query';
import { Observable } from 'rxjs';
import { RealtimeSubscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [MessageService]
})
export class ChatComponent implements OnInit {
  menuItems: MenuItem[] = orgaeMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;

  groupFilterOn: boolean = false;
  searchTerm: string = '';

  chats$ = new Observable<Chat[]>();
  chatRealTimeChanges: RealtimeSubscription | undefined;
  newFollowerRealTimeChanges: RealtimeSubscription | undefined;

  loadingInitial: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private chatQuery: ChatQuery,
    private chatServiceStore: ChatServiceStore,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.chats$ = this.chatQuery.allChats$;
  }

  async loadInitialData(): Promise<void> {
    try {
      this.loadingInitial = true;
      this.error = false;
      await this.chatServiceStore.selectAllRoomsOfUser();
      this.newFollowerRealTimeChanges = this.chatServiceStore.getRealTimeChangesOnNewFollow();
      this.chatRealTimeChanges = this.chatServiceStore.getRealTimeChanges();
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.loadingInitial = false;
    }
  }

  ngOnDestroy(): void {
    if(this.chatRealTimeChanges) {
      this.chatRealTimeChanges.unsubscribe();
    }
    if(this.newFollowerRealTimeChanges) {
      this.newFollowerRealTimeChanges.unsubscribe();
    }
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
