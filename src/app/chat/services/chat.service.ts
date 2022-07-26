import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabaseClient: SupabaseClient;


  constructor(private readonly authentificationQuery: AuthentificationQuery) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   async selectAllRoomsOfUser(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('select_all_rooms_of_user', {
        user_id_in: loggedInID
      })
    return chatResults;
  }

  async resetNumberOfUnreadMessages(room_id: string, message_reader: string): Promise<{data: any, error: any}> {
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('reset_number_of_unread_messages', {
        room_id_in: room_id,
        user_id_of_reader: message_reader
      })
    return chatResults;
  }

  async resetNumberOfUnreadMessagesOfGroup(group_id: string, message_reader: string): Promise<{data: any, error: any}> {
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('reset_number_of_unread_messages_in_group', {
        group_id_in: group_id,
        user_id_of_reader: message_reader
      })
    return chatResults;
  }

  async getAllMessagesOfChat(room_id: string): Promise<{data: any, error: any}> {
    const messages: {data: any, error: any} = await this.supabaseClient
    .rpc('select_all_messages_of_room', {
      room_id_in: room_id
    })
    return messages;
/*     const results: {data: any, error: any} = await this.supabaseClient
    .from('rooms_messages')
    .select(
      `id,
      created_at,
      user_id,
      content
      `
    )
    .eq('room_id', room_id)
    .order('created_at', { ascending: true }) */
  }

  async sendMessage(
    room_id: string,
    message_receiver: string,
    content_in: string,
    is_group_in: boolean,
    group_id_in: string | undefined | null
    ): Promise<{data: any, error: any}> {
    let message_sender: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      message_sender = uuid;
    });
    const messageFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('send_message_transaction', {
        room_id_in: room_id,
        message_sender: message_sender,
        message_receiver: message_receiver,
        content_in: content_in,
        is_group: is_group_in,
        group_id_in: group_id_in
      })
    return messageFeedback;
  }

  async checkIfChatPartnerAcceptedRequest(room_id: string, loggedInUserId:string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('rooms_participants')
      .select(
        `accepted`
      )
      .eq('room_id', room_id)
      .eq('user_id', loggedInUserId)
      .single()
    return results;
  }

  async acceptChatRequest(room_id: string, loggedInUserId:string): Promise<{data: any, error: any}> {
    const acceptFeedback: {data: any, error: any} = await this.supabaseClient
    .rpc('accept_chat_request', {
      room_id_in: room_id,
      user_id_of_reader: loggedInUserId
    })
  return acceptFeedback;
  }

  async getChatPartner(room_id: string): Promise<{data: any, error: any}> {
    let message_sender: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      message_sender = uuid;
    });
    const groupFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('select_chat_partner', {
        message_sender: message_sender,
        room_id_in: room_id
      })
    return groupFeedback;
  }

  async rejectChatRequest(room_id: string, chatPartner: string, loggedInID: string): Promise<{data: any, error: any}> {
    const deleteFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('reject_chat_request_transaction', {
        room_id_in: room_id,
        follower_id: chatPartner,
        following_id: loggedInID
      })
    return deleteFeedback;
  }


  async getGroupAsChatPartner(room_id: string): Promise<{data: any, error: any}> {
    const groupFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('select_group_as_chat_partner', {
        room_id_in: room_id
      })
    return groupFeedback;
  }

}
