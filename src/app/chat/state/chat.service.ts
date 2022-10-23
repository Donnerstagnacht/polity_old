import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeChannel, RealtimePostgresUpdatePayload, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Chat } from './chat.model';
import { ChatQuery } from './chat.query';
import { ChatStore } from './chat.store';
import { Subscription } from 'rxjs';
import { RealtimeChannelSnapshot } from 'lib/realtime';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private supabaseClient: SupabaseClient;

  profileRealtimeChannel: RealtimeChannel | undefined;
  groupRealtimeChannel: RealtimeChannel | undefined;
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

  getRealTimeChangesOnNewFollow(): RealtimeChannel {
    let loggedInID: string | null = '';
    this.authSubscription2 = this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      loggedInID = uuid;
    });
    const subscription = this.supabaseClient
    .channel(`following_profile_system:following=eq.${loggedInID}`)
    .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'following_profile_system'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        console.log()
        console.log(payload);
        this.selectAllRoomsOfUser();
      }
    )
    // .from<any>(`following_profile_system:following=eq.${loggedInID}`)
/*     .on('INSERT', (payload) => {
      console.log()
      console.log(payload);
      this.selectAllRoomsOfUser();
    }) */
    .subscribe()
    return subscription;
  }

  getRealTimeChanges(): any {
    this.chatQuery.allChats$.subscribe((allChats: Chat[]) => {
      allChats.forEach((chat: Chat) => {
        let roomId: string = chat.id;
        const subscription = this.supabaseClient
        .channel(`rooms:id=eq.${roomId}`)
        .on('postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'rooms'
          },
          (payload: RealtimeChannelSnapshot<any>) => {
            this.chatStore.update(
              roomId,
              {
                last_message: payload.record.last_message,
                last_message_time: payload.record.last_message_time
              }
            )
          }
        )
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rooms'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('INSERT')
          console.log('payload')
          console.log(payload)
        }
      )
      .on('postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'rooms'
        },
        (payload: RealtimeChannelSnapshot<any>) => {
          console.log('DELETE')
          console.log('Payload')
          console.log(payload)
          this.chatStore.remove(payload.record.id);
        }
      )
      //  .from<any>(`rooms:id=eq.${roomId}`)
/*         .on('UPDATE', (payload) => {
          this.chatStore.update(
            roomId,
            {
              last_message: payload.new.last_message,
              last_message_time: payload.new.last_message_time
            }
          )
        }) */
/*         .on('INSERT', (payload) => {
          console.log('INSERT')
          console.log('payload')
          console.log(payload)
        }) */
/*         .on('DELETE', (payload) => {
          console.log('DELETE')
          console.log('Payload')
          console.log(payload)
          this.chatStore.remove(payload.old.id);
        }) */
        .subscribe()
        return subscription;
        })

      allChats.forEach((chat: Chat) => {
        let roomId: string = chat.id;
        const subscription = this.supabaseClient
          .channel(`public:rooms_participants:room_id=eq.${roomId}`)
          .on('postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'rooms_participants'
            },
            (payload: RealtimeChannelSnapshot<any>) => {
              this.chatStore.update(
                roomId,
                {
                  number_of_unread_messages: payload.record.number_of_unread_messages,
                }
              )
            }
          )
        // .from<any>(`rooms_participants:room_id=eq.${roomId}`)
/*         .on('UPDATE', (payload) => {
          this.chatStore.update(
            roomId,
            {
              number_of_unread_messages: payload.new.number_of_unread_messages,
            }
          )
        }) */
        .subscribe()
        return subscription;
        })
    })

  }

}
