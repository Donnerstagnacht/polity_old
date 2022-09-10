import { Injectable, OnDestroy } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { News, Notifications } from './news.model';
import { NewsState, NewsStore } from './news.store';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService implements OnDestroy {
  private supabaseClient: SupabaseClient;
  loggedInID: string | undefined;
  authSubscription: Subscription | undefined;

  constructor(
    private newsStore: NewsStore,
    private authentificationQuery: AuthentificationQuery

    ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
      this.authSubscription =  this.authentificationQuery.uuid$.subscribe((uuid: any) => {
        this.loggedInID = uuid;
        console.log(this.loggedInID)
      });
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  async getAllNotifications(): Promise<{ data: any, error: any }> {
    console.log('called')
    const notifications: { data: any, error: any } = await this.supabaseClient
    .from('notifications_of_user')
    .select(`
      *,
      profiles:notifier (
        avatar_url,
        name
      )
    `)
    .eq('notifying', this.loggedInID)
    console.log(notifications)
    console.log('notifications.data')
    console.log(notifications.data)

    if(notifications.data) {
      const newsList: News[] = [];

      notifications.data.forEach((dataItem: {
        id: string,
        notifier: string,
        notifying: string,
        title: string,
        content: string,
        type: string,
        created_at: string,
        from_group: string
        profiles: {
          name: string,
          avatar_url: string
        }
      }) => {
        const news: News = {
          id: dataItem.id,
          notifier: dataItem.notifier,
          notifying: dataItem.notifying,
          title: dataItem.title,
          content: dataItem.content,
          type: dataItem.type,
          created_at: dataItem.created_at,
          from_group: dataItem.from_group,
          avatar_url: dataItem.profiles.avatar_url,
          name: dataItem.profiles.name
        }
        newsList.push(news);
      });
      console.log('newsList')
      console.log(newsList)
      this.newsStore.set(newsList);
    }
    if(notifications.error) throw new Error(notifications.error.message);
    return notifications;
  }

  getRealTimeChangesNews(): RealtimeSubscription {
    console.log('called')
    console.log(this.loggedInID)
    const subscription = this.supabaseClient
    .from<any>(`notifications_of_user:notifying=eq.${this.loggedInID}`)
    .on('INSERT', (payload) => {
      console.log('triggered')
      console.log(payload);
      this.supabaseClient
        .from('profiles')
        .select(`
            avatar_url,
            name
        `)
        .eq('id', payload.new.notifier)
        .single()
      .then((result: any) => {
        console.log(result)
        const news: News = {
          id: payload.new.id,
          notifier: payload.new.notifier,
          notifying: payload.new.notifying,
          title: payload.new.title,
          content: payload.new.content,
          type: payload.new.type,
          created_at: payload.new.created_at,
          from_group: payload.new.from_group,
          avatar_url: result.data.avatar_url,
          name: result.data.name
        }
        this.newsStore.add(news);
      });

/*       this.newsStore.update((state: NewsState) => {
        let newsBefore: News[] = state.
        let newsAfter: number = newsBefore.push(news)
        state.messages = newsBefore;
      }) */
      // this.newMessageOfUserNotifier.next(newMessage.sender_id);
    })
    .subscribe()
    return subscription;
  }

  add(news: News) {
    this.newsStore.add(news);
  }

  update(id: string, news: Partial<News>) {
    this.newsStore.upsert(id, news);
  }

  remove(id: ID) {
    this.newsStore.remove(id);
  }

}
