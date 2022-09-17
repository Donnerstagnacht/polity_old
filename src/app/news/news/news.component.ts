import { Component, OnInit } from '@angular/core';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PaginationData, PaginationFrontendService } from 'src/app/utilities/storage/services/pagination-frontend.service';
import { orgaMenuitems, orgaMenuitemsMega } from '../../chat/state/orgaMenuItems';
import { News } from '../state/news.model';
import { NewsQuery } from '../state/news.query';
import { NewsService } from '../state/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [MessageService]
})
export class NewsComponent implements OnInit {
  menuItems: MenuItem[] = orgaMenuitems;
  menuItemsMega: MegaMenuItem[] = orgaMenuitemsMega;
  newsList: News[] = [];

  taskFilterOn: boolean = false;
  amendmentFilterOn: boolean = false;
  eventFilterOn: boolean = false;
  groupFilterOn: boolean = false;
  accountFilterOn: boolean = false;

  newsSubscription: Subscription | undefined;
  newsUsersFilterSubscription: Subscription | undefined;
  newsGroupsFilterSubscription: Subscription | undefined;
  newsRealTimeSubscription: RealtimeSubscription | undefined;

  paginationData: PaginationData = {
    from: 0,
    to: 4,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

  errorMessage: string = '';
  error: boolean = false;
  loadingInitial: boolean = false;

  constructor(
    private messageService: MessageService,
    private newsService: NewsService,
    private newsQuery: NewsQuery,
    private paginationService: PaginationFrontendService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  async ngOnDestroy(): Promise<void> {
    if(this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
    if(this.newsUsersFilterSubscription) {
      this.newsUsersFilterSubscription.unsubscribe();
    }
    if(this.newsRealTimeSubscription) {
      this.newsRealTimeSubscription.unsubscribe();
    }
    if(this.newsGroupsFilterSubscription) {
      this.newsGroupsFilterSubscription.unsubscribe();
    }

    try {
      await this.newsService.resetNotificationsCounter();
      await this.newsService.markNotificationsAsUnread();
      await this.newsService.markNotificationsAsUnreadFromGroup();
    } catch(error: any) {
      this.messageService.add({severity: 'success', summary: 'success'});
    }
  }

  loadNewData(): void {
    this.paginationData = this.paginationService.scrollDownAndLoadAscending(this.paginationData);
  }

  onSearch(searchTerm: string): void {}

  setTaskFilter(): void {
    this.taskFilterOn = !this.taskFilterOn;
  }

  setAmendmentFilter(): void {
    this.amendmentFilterOn = !this.amendmentFilterOn;
  }

  setEventFilter(): void {
    this.eventFilterOn = !this.eventFilterOn;
  }

  setGroupFilter(): void {
    this.groupFilterOn = !this.groupFilterOn;
    if(this.groupFilterOn) {
      this.newsGroupsFilterSubscription = this.newsQuery.filterNewsByType('groups').subscribe((newsList: News[]) => {
        this.newsList = newsList;
        this.paginationData.numberOfSearchResults = this.newsList.length;
      });
    } else {
      this.subscribeAllNews();
    }
  }

  setAccountFilter(): void {
    this.accountFilterOn = !this.accountFilterOn;
    if(this.accountFilterOn) {
      this.newsUsersFilterSubscription = this.newsQuery.filterNewsByType('account').subscribe((newsList: News[]) => {
        this.newsList = newsList;
        this.paginationData.numberOfSearchResults = this.newsList.length;
      });
    } else {
      this.subscribeAllNews();
    }
  }

  subscribeAllNews(): void {
    this.newsSubscription = this.newsQuery.allNews$.subscribe((newsList: News[]) => {
      this.newsList = newsList;
      this.paginationData.numberOfSearchResults = this.newsList.length;
      console.log('loaded news')
      console.log(this.newsList)

    });
  }

  async loadInitialData(): Promise<void> {
    try {
      this.loadingInitial = true;
      this.error = false;
      this.newsRealTimeSubscription = this.newsService.getRealTimeChangesNews();
      await this.newsService.getAllNotifications();
      this.subscribeAllNews();
      this.messageService.add({severity: 'success', summary: 'success'});
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message;
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.loadingInitial = false;
    }
  }

}
