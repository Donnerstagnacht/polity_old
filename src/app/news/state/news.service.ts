import { Injectable, OnDestroy } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { News } from './news.model';
import { NewsStore } from './news.store';
import { Subscription, Subject, Observable } from 'rxjs';
import { GroupsService } from 'src/app/groups/services/groups.service';
import { ProfileService } from 'src/app/profile/state/profile.service';

@Injectable({ providedIn: 'root' })
export class NewsService implements OnDestroy {
  private supabaseClient: SupabaseClient;
  loggedInID: string | undefined;
  authSubscription: Subscription | undefined;
  notifier = new Subject<News>();
  notifier$: Observable<News> = this.notifier.asObservable();

  constructor(
    private newsStore: NewsStore,
    private authentificationQuery: AuthentificationQuery,
    private groupsService: GroupsService,
    private profileService: ProfileService
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


  async getAllNotifications(): Promise<void> {
    console.log('called')
    let newsList: News[] = [];
/*     const notificationsFromUsers: { data: any, error: any } = await this.supabaseClient
      .from('notifications_of_user')
      .select(`
        *,
        profiles:notifier (
          avatar_url,
          name
        )
      `)
      .eq('notifying', this.loggedInID); */
/*     console.log(notifications)
    console.log('notifications.data')
    console.log(notifications.data) */
/*     if(notificationsFromUsers.error) throw new Error(notificationsFromUsers.error.message);
    if(notificationsFromUsers.data) {
    notificationsFromUsers.data.forEach((dataItem: {
      id: string,
      notifier: string,
      notifying: string,
      handler: string,
      title: string,
      message: string,
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
        handler: dataItem.handler,
        title: dataItem.title,
        message: dataItem.message,
        type: dataItem.type,
        created_at: dataItem.created_at,
        from_group: dataItem.from_group,
        avatar_url: dataItem.profiles.avatar_url,
        name: dataItem.profiles.name
      }
      newsList.push(news);
    }); */
/*     console.log('newsList')
    console.log(newsList) */
/*     }
    if(notificationsFromUsers.error) throw new Error(notificationsFromUsers.error.message);
 */
/*notifications_of_groups

      .eq('notifying', this.loggedInID);

     ,
        groups:notifier (
          avatar_url,
          name
        ) */
    const notificationsFromGroups: { data: any, error: any } = await this.supabaseClient
      .rpc('select_notifications_from_groups_user_admin',
      {
        user_id_in: this.loggedInID
      });


          /*
                  groups:group_id (
          avatar_url,
          name
        ),
          */
/*       const notificationsFromGroups: { data: any, error: any } = await this.supabaseClient
        .from('group_members')
        .select(`
        groups:group_id (
          avatar_url,
          name
        )
        notifications_of_groups:notifications_of_groups!notifications_of_groups_notifying_fkey (

        `)
        .eq('user_id', this.loggedInID)
        .eq('is_admin', true); */
    console.log('notificationsFromGroups')
    console.log(notificationsFromGroups)
    newsList = notificationsFromGroups.data

    if(notificationsFromGroups.error) throw new Error(notificationsFromGroups.error.message);

/*     notificationsFromGroups.data.forEach((news: News) => {

      console.log('news')
      console.log(news)
      newsList.push(news);
    }); */
    console.log('newslist')
    console.log(newsList)
    this.newsStore.set(newsList);
  }

  getRealTimeChangesNews(): RealtimeChannel {
    console.log('called')
    console.log(this.loggedInID)
    const subscription = this.supabaseClient
      .channel(`notifications_of_user:notifying=eq.${this.loggedInID}`)
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'publuc',
          table: 'notifications_of_user'
        },
        payload => {
          console.log('triggered')
          console.log(payload);
          this.supabaseClient
            .from('profiles')
            .select(`
                avatar_url,
                name
            `)
            .eq('id', payload.new['notifier'])
            .single()
          .then((result: any) => {
            console.log(result)
            const news: News = {
              id: payload.new['id'],
              notifier: payload.new['notifier'],
              notifying: payload.new['notifying'],
              handler: payload.new['handler'],
              title: payload.new['title'],
              message: payload.new['message'],
              type: payload.new['type'],
              created_at: payload.new['created_at'],
              from_group: payload.new['from_group'],
              avatar_url: result.data.avatar_url,
              name: result.data.name,
              new: payload.new['new']
            }
            this.newsStore.add(news);
            this.notifier.next(news);
            console.log('notifier called');
          });
    
        }
      )
/*     .from<any>(`notifications_of_user:notifying=eq.${this.loggedInID}`)
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
          handler: payload.new.handler,
          title: payload.new.title,
          message: payload.new.message,
          type: payload.new.type,
          created_at: payload.new.created_at,
          from_group: payload.new.from_group,
          avatar_url: result.data.avatar_url,
          name: result.data.name,
          new: payload.new.new
        }
        this.newsStore.add(news);
        this.notifier.next(news);
        console.log('notifier called');
      });

/*       this.newsStore.update((state: NewsState) => {
        let newsBefore: News[] = state.
        let newsAfter: number = newsBefore.push(news)
        state.messages = newsBefore;
      }) */
      // this.newMessageOfUserNotifier.next(newMessage.sender_id);
    // }) */
    .subscribe()
    return subscription;
  }

  async getRealTimeChangesOfAdminGroups(): Promise<void> {

    console.log('called')
    console.log(this.loggedInID)
    const groupList: {data: any, error: any} = await this.groupsService.selectAllGroupsWithUserAdmin();
    console.log('groupList')
    console.log(groupList);
  
    groupList.data.forEach((element: any) => {
      console.log(element);
      const subscription = this.supabaseClient
        .channel(`public:notifications_of_groups:notifying=eq.${element.group_id}`)
        .on('postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications_of_groups'
          },
          payload => {
            console.log('triggered')
            console.log(payload);
            if(payload.new['for_admins']) {
              this.supabaseClient
              .from('profiles')
              .select(`
                  avatar_url,
                  name
              `)
              .eq('id', payload.new['notifier'])
              .single()
            .then((result: any) => {
              console.log(result)
              const news: News = {
                id: payload.new['id'],
                notifier: payload.new['notifier'],
                notifying: payload.new['notifying'],
                handler: payload.new['handler'],
                title: payload.new['title'],
                message: payload.new['message'],
                type: payload.new['type'],
                created_at: payload.new['created_at'],
                from_group: payload.new['from_group'],
                avatar_url: result.data.avatar_url,
                name: result.data.name,
                new: payload.new['new']
              }
              this.newsStore.add(news);
              this.notifier.next(news);
              console.log('notifier called');
            });
            }
          }
        )
/*       .from<any>(`notifications_of_groups:notifying=eq.${element.group_id}`)
      .on('INSERT', (payload) => {
        console.log('triggered')
        console.log(payload);
        if(payload.new.for_admins) {
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
            handler: payload.new.handler,
            title: payload.new.title,
            message: payload.new.message,
            type: payload.new.type,
            created_at: payload.new.created_at,
            from_group: payload.new.from_group,
            avatar_url: result.data.avatar_url,
            name: result.data.name,
            new: payload.new.new
          }
          this.newsStore.add(news);
          this.notifier.next(news);
          console.log('notifier called');
        });
        }
      }) */
      .subscribe()
      return subscription;
    });
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

  async resetNotificationsCounter(): Promise<{ data: any, error: any }> {
    const resetCounterResponse: { data: any, error: any } = await this.supabaseClient
      .from('profiles_counters')
      .update({unread_notifications_counter: 0})
      .eq('id', this.loggedInID);
    if(resetCounterResponse.error) throw new Error(resetCounterResponse.error.message);
    return resetCounterResponse;
  }

  async markNotificationsAsUnread(): Promise<{ data: any, error: any }> {
    console.log('called reset')
    const markAsUnreadResponse: { data: any, error: any } = await this.supabaseClient
      .from('notifications_of_user')
      .update({new: false})
      .eq('notifying', this.loggedInID);
    // await this.markNotificationsAsUnreadFromGroup();
    // await this.set_non_existing_groups_set_notifications_to_false()
    if(markAsUnreadResponse.error) throw new Error(markAsUnreadResponse.error.message);
    return markAsUnreadResponse;
  }

  async markNotificationsAsUnreadFromGroup(): Promise<{ data: any, error: any }> {
    console.log('mark group')
    const groupList: {data: any, error: any} = await this.groupsService.selectAllGroupsWithUserAdmin();

    console.log('GROUPLIST DATA');
    console.log(groupList.data);
    let groupIdsList: string[] = [];
    groupList.data.forEach((element: any) => {
      groupIdsList.push(element.group_id);
    });
    if(groupList.data.length > 0) {
      const markAsUnreadResponse: { data: any, error: any } = await this.supabaseClient
      .from('notifications_of_groups')
      .update({new: false})
      .in('notifying', groupIdsList);
    if(markAsUnreadResponse.error) throw new Error(markAsUnreadResponse.error.message);
      return markAsUnreadResponse;
    }
    return groupList;
  }

  async resetUnreadNotificationsCounter(): Promise<{data: any, error: any}> {
    const resetResponse: {data: any, error: any} = await this.supabaseClient
      .rpc('reset_unread_notifications_counter', {
        user_id: this.loggedInID,
      });
    if(resetResponse.error) throw new Error(resetResponse.error.message);
    if (this.loggedInID) {
      this.profileService.updateUnreadNotificationCounter(this.loggedInID);
    }
    return resetResponse;
  }

  async set_non_existing_groups_set_notifications_to_false(): Promise<{data: any, error: any}> {
    const resetResponse: {data: any, error: any} = await this.supabaseClient
      .rpc('set_non_existing_groups_set_notifications_to_false', {
        user_id_in: this.loggedInID,
      });
    if(resetResponse.error) throw new Error(resetResponse.error.message);
    return resetResponse;
  }

}
