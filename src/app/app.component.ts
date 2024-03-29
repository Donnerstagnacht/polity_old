import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthentificationQuery } from './authentification/state/authentification.query';
import { News } from './news/state/news.model';
import { NewsService } from './news/state/news.service';
import { Profile } from './profile/state/profile.model';
import { ProfileQuery } from './profile/state/profile.query';
import { ProfileService } from './profile/state/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'polity';
  unreadNotifications: number = 0;

  profileSubscription: Subscription | undefined;
  authSubscription: Subscription | undefined;
  profileRealTimeSubscription: RealtimeChannel | undefined;
  newsRealTImeSubscription: RealtimeChannel | undefined;
  newsRealTImeSubscriptionGroup: RealtimeChannel | undefined;
  notifierSubscription: Subscription | undefined;
  lastNewsSubscription: Subscription | undefined;

  constructor(
    private authQuery: AuthentificationQuery,
    private profileQuery: ProfileQuery,
    private profileService: ProfileService,
    private messageService: MessageService,
    private newsService: NewsService
    ) { }

  ngOnInit(): void {
    this.authQuery.uuid$.subscribe((uuid: string | null) => {
      if(uuid) {
        this.profileQuery.selectEntity(uuid).subscribe((profile: Profile | undefined) => {
          if(profile) {
            this.unreadNotifications = profile.unread_notifications_counter;
          }
        });
        this.profileRealTimeSubscription = this.profileService.getRealTimeChangesCounters(uuid);
        this.newsRealTImeSubscription = this.newsService.getRealTimeChangesNews();
        this.newsService.getRealTimeChangesOfAdminGroups();
        this.notifierSubscription = this.newsService.notifier$.subscribe((news: News) => {
          this.messageService.add({severity:'success', summary: news.message});
        });
      } else {
        console.log('unsubscribe')
        // this.unreadNotifications = 0;
        this.authSubscription?.unsubscribe();
        this.profileSubscription?.unsubscribe();
        this.profileRealTimeSubscription?.unsubscribe();
        this.newsRealTImeSubscription?.unsubscribe();
        this.notifierSubscription?.unsubscribe();
        this.lastNewsSubscription?.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe')
    this.unreadNotifications = 0;
    this.authSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
    this.profileRealTimeSubscription?.unsubscribe();
    this.newsRealTImeSubscription?.unsubscribe();
    this.notifierSubscription?.unsubscribe();
    this.lastNewsSubscription?.unsubscribe();
  }

}
