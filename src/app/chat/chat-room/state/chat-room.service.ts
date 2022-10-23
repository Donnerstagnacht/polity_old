import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { Message } from 'src/app/UI-elements/message/message.component';
import { environment } from 'src/environments/environment';
import { ChatRoomStore, ChatRoomState } from './chat-room.store';
import { Observable, Subject } from 'rxjs';
import { ChatRoomQuery } from './chat-room.query';
import { all } from 'cypress/types/bluebird';
import { RealtimeChannelSnapshot } from 'lib/realtime';

@Injectable({ providedIn: 'root' })
export class ChatRoomService {
  private supabaseClient: SupabaseClient;
  newMessageOfUserNotifier = new Subject<string>();

  constructor(
    private chatRoomStore: ChatRoomStore,
    private chatRoomQuery: ChatRoomQuery
     ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getAllMessagesOfChat(room_id: string, from: number, to: number): Promise<{data: any, error: any}> {
    const messages: {data: any, error: any} = await this.supabaseClient
    .rpc('select_all_messages_of_room', {
      room_id_in: room_id
    })
    .order('created_at_in', {ascending: false})
/*     .range(from, to)
 */    ;
/*     if(messages.data) {
      const newMessages: Message[] = messages.data;
      // this.chatRoomStore.reset();
      const oldMessages: Message[] = this.chatRoomQuery.getValue().messages;
      const oledMessagesTransformed: Message[] = Object.assign([], oldMessages);
      newMessages.forEach((message: Message) => {
        oledMessagesTransformed.push(message)
      });
      this.chatRoomStore.update({messages: oledMessagesTransformed});
      // this.chatRoomStore.update({messages: allMessages});
    } */
    if(messages.data) {
      this.chatRoomStore.update({messages: messages.data});
    }
    if(messages.error) throw new Error(messages.error.message);
    return messages;
  }

  getRealTimeChangesMessages(room_id: string): RealtimeChannel {
    const subscription = this.supabaseClient
      .channel(`rooms_messages:room_id=eq.${room_id}`)
      .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'rooms_messages'
      },
      (payload: RealtimeChannelSnapshot<any>) => {
        const newMessage: Message = {
          message_id: payload.record.message_id,
          created_at_in: payload.record.created_at,
          sender_id: payload.record.user_id,
          content_in: payload.record.content
        }
        this.chatRoomStore.update((state: ChatRoomState) => {
          let oldMessages: Message[] =state.messages
          let newMessages: number = oldMessages.push(newMessage)
          state.messages = oldMessages;
        })
        this.newMessageOfUserNotifier.next(newMessage.sender_id);
      })
    // .from<any>(`rooms_messages:room_id=eq.${room_id}`)
/*     .on('INSERT', (payload) => {
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
      this.newMessageOfUserNotifier.next(newMessage.sender_id);
    }) */
    .subscribe()
    return subscription;
  }

}
