import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Chat } from './chat.model';
import { ChatQuery } from './chat.query';
import { ChatState, ChatStore } from './chat.store';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private supabaseClient: SupabaseClient;

  constructor(
    private chatQuery: ChatQuery,
    private authentificationQuery: AuthentificationQuery,
    private chatStore: ChatStore) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }


  async selectAllRoomsOfUser(): Promise<void> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      loggedInID = uuid;
    });
    const chatResults: void = await this.supabaseClient
      .rpc('select_all_rooms_of_user', {
        user_id_in: loggedInID
      })
      .then((chatResults: {data: any, error: any} ) => {
        const chats: Chat[] = chatResults.data
        this.chatStore.reset();
        this.chatStore.add(chats);
      })
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
