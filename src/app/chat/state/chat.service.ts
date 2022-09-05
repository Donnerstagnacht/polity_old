import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Chat } from './chat.model';
import { ChatQuery } from './chat.query';
import { ChatStore } from './chat.store';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private supabaseClient: SupabaseClient;

  profileRealtimeSubscription: RealtimeSubscription | undefined;
  groupRealtimeSubscription: RealtimeSubscription | undefined;
  authSubscription: Subscription | undefined;
  authSubscription2: Subscription | undefined;

  constructor(
    private chatQuery: ChatQuery,
    private authentificationQuery: AuthentificationQuery,
    private chatStore: ChatStore) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if(this.authSubscription2) {
      this.authSubscription2.unsubscribe();
    }
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  async selectAllRoomsOfUser(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authSubscription = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      loggedInID = uuid;
    });
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('select_all_rooms_of_user', {
        user_id_in: loggedInID
      });
    if(chatResults.data) {
      const chats: Chat[] = chatResults.data
      this.chatStore.reset();
      this.chatStore.add(chats);
    }
    if(chatResults.error) throw new Error(chatResults.error.message);
    return chatResults;
  }

  add(chat: Chat) {
    this.chatStore.add(chat);
  }

  update(id: any, chat: Partial<Chat>) {
    this.chatStore.update(id, chat);
  }

  remove(id: ID) {
    this.chatStore.remove(id);
  }

  getRealTimeChangesOnNewFollow(): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authSubscription2 = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      loggedInID = uuid;
    });
    const subscription = this.supabaseClient
    .from<any>(`following_profile_system:following=eq.${loggedInID}`)
    .on('INSERT', (payload) => {
      console.log()
      console.log(payload);
      this.selectAllRoomsOfUser();
    })
    .subscribe()
    return subscription;
  }

  getRealTimeChanges(): any {
    this.chatQuery.allChats$.subscribe((allChats: Chat[]) => {
      allChats.forEach((chat: Chat) => {
        let roomId: string = chat.id;
        const subscription = this.supabaseClient
        .from<any>(`rooms:id=eq.${roomId}`)
        .on('UPDATE', (payload) => {
          this.chatStore.update(
            roomId,
            {
              last_message: payload.new.last_message,
              last_message_time: payload.new.last_message_time
            }
          )
        })
        .on('INSERT', (payload) => {
          console.log('INSERT')
          console.log('payload')
          console.log(payload)
        })
        .on('DELETE', (payload) => {
          console.log('DELETE')
          console.log('Payload')
          console.log(payload)
          this.chatStore.remove(payload.old.id);
        })
        .subscribe()
        return subscription;
        })

      allChats.forEach((chat: Chat) => {
        let roomId: string = chat.id;
        const subscription = this.supabaseClient
        .from<any>(`rooms_participants:room_id=eq.${roomId}`)
        .on('UPDATE', (payload) => {
          this.chatStore.update(
            roomId,
            {
              number_of_unread_messages: payload.new.number_of_unread_messages,
            }
          )
        })
        .subscribe()
        return subscription;
        })
    })

  }

}
