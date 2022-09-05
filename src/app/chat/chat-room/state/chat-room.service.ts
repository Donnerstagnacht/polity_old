import { Injectable } from '@angular/core';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { Message } from 'src/app/UI-elements/message/message.component';
import { environment } from 'src/environments/environment';
import { ChatRoomStore, ChatRoomState } from './chat-room.store';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatRoomService {
  private supabaseClient: SupabaseClient;
  scrollDownNotifierOfUser = new Subject<string>();

  constructor(
    private chatRoomStore: ChatRoomStore,
     ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getAllMessagesOfChat(room_id: string): Promise<{data: any, error: any}> {
    const messages: {data: any, error: any} = await this.supabaseClient
    .rpc('select_all_messages_of_room', {
      room_id_in: room_id
    });
    if(messages.data) {
      const allMessages: Message[] = messages.data;
      this.chatRoomStore.reset();
      this.chatRoomStore.update({messages: allMessages});
    }
    if(messages.error) throw new Error(messages.error.message);
    return messages;
  }

  getRealTimeChangesMessages(room_id: string): RealtimeSubscription {
    const subscription = this.supabaseClient
    .from<any>(`rooms_messages:room_id=eq.${room_id}`)
    .on('INSERT', (payload) => {
      const newMessage: Message = {
        message_id: payload.new.message_id,
        created_at_in: payload.new.created_at,
        sender_id: payload.new.user_id,
        content_in: payload.new.content
      }
      this.chatRoomStore.update((state: ChatRoomState) => {
        let oldMessages: Message[] =state.messages
        let newMessages: number = oldMessages.push(newMessage)
        state.messages = oldMessages;
      })
      this.scrollDownNotifierOfUser.next(newMessage.sender_id);
    })
    .subscribe()
    return subscription;
  }

}
