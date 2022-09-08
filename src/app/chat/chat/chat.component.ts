import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { ChatService as ChatServiceStore } from '../state/chat.service';
import { Chat } from '../state/chat.model';
import { orgaeMenuitems, orgaMenuitemsMega } from '../state/orgaMenuItems';
import { ChatQuery } from '../state/chat.query';
import { Observable } from 'rxjs';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { PaginationData, PaginationFrontendService } from 'src/app/utilities/storage/services/pagination-frontend.service';

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

  // chats$ = new Observable<Chat[]>();
  chats: Chat[] = [];
  chatRealTimeChanges: RealtimeSubscription | undefined;
  newFollowerRealTimeChanges: RealtimeSubscription | undefined;

  loadingInitial: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;

  paginationData: PaginationData = {
    from: 0,
    to: 4,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

  constructor(
    private chatQuery: ChatQuery,
    private chatServiceStore: ChatServiceStore,
    private messageService: MessageService,
    private paginationService: PaginationFrontendService
    ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.chatQuery.allChats$.subscribe((chats: Chat[]) => {
      if(chats) {
        this.chats = chats;
        this.paginationData.numberOfSearchResults = this.chats.length;
      }
    });
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

  loadNewData(): void {
    this.paginationData = this.paginationService.scrollDownAndLoadAscending(this.paginationData);
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.chatQuery.filterData(this.searchTerm, this.groupFilterOn).subscribe((chats: Chat[]) => {
      this.chats = chats;
    });
  }

  setGroupFilter(): void {
    this.groupFilterOn = !this.groupFilterOn;
    this.chatQuery.filterData(this.searchTerm, this.groupFilterOn).subscribe((chats: Chat[]) => {
      this.chats = chats;
    });
  }

}
