import { Injectable } from '@angular/core';
import { createClient, RealtimeSubscription, SupabaseClient, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { Profile } from 'src/app/profile/state/profile.model';
import { Message } from 'src/app/UI-elements/message/message.component';
import { environment } from 'src/environments/environment';
import { ChatRoomStore, ChatRoomState } from './chat-room.store';

@Injectable({ providedIn: 'root' })
export class ChatRoomService {
  private supabaseClient: SupabaseClient;

  constructor(
    private chatRoomStore: ChatRoomStore,
     ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getAllMessagesOfChat(room_id: string): Promise<void> {
    console.log('chat_rooom service')
    const messages: void = await this.supabaseClient
    .rpc('select_all_messages_of_room', {
      room_id_in: room_id
    })
    .then((messages: {data: any, error: any} ) => {
      const allMessages: Message[] = messages.data;
      this.chatRoomStore.reset();
      this.chatRoomStore.update({messages: allMessages});
    })
    return messages;
  }

  getRealTimeChanges(uuid: string): RealtimeSubscription {
    // console.log('testing real time')
    const subscription = this.supabaseClient
    // .from<any>(`rooms_messages:room_id=eq.${uuid}`)
    // .from<any>(`rooms_messages`)
    .from<any>(`rooms_messages:room_id=eq.${uuid}`)
    // .on('UPDATE', (payload) => {
    .on('INSERT', (payload) => {
      // this.chatRoomStore.reset()
      const newMessage: Message = {
        message_id: payload.new.message_id,
        created_at_in: payload.new.created_at,
        sender_id: payload.new.user_id,
        content_in: payload.new.content
      }
      // console.log(newMessage)

      this.chatRoomStore.update((state: ChatRoomState) => {

       /*  console.log('old state')
        console.log(state.messages) */

        let oldMessages: Message[] =state.messages
        let newMessages: number = oldMessages.push(newMessage)

/*         console.log('new state')
        console.log(oldMessages) */
        state.messages = oldMessages;
      })
      // console.log(payload.new)
    })
    .subscribe()
    return subscription;
  }

}
