import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabaseClient: SupabaseClient;
  loggedInID: string | undefined;
  authSubscription: Subscription | undefined;

  constructor(private readonly authentificationQuery: AuthentificationQuery) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      this.loggedInID = uuid;
    });
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async resetNumberOfUnreadMessages(room_id: string, message_reader: string): Promise<{data: any, error: any}> {
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('reset_number_of_unread_messages', {
        room_id_in: room_id,
        user_id_of_reader: message_reader
      })
    if(chatResults.error) throw new Error(chatResults.error.message);
    return chatResults;
  }

  async resetNumberOfUnreadMessagesOfGroup(group_id: string, message_reader: string): Promise<{data: any, error: any}> {
    const chatResults: {data: any, error: any} = await this.supabaseClient
      .rpc('reset_number_of_unread_messages_in_group', {
        group_id_in: group_id,
        user_id_of_reader: message_reader
      });
    if(chatResults.error) throw new Error(chatResults.error.message);
    return chatResults;
  }

  async sendMessage(
    room_id: string,
    message_receiver: string,
    content_in: string,
    is_group_in: boolean,
    group_id_in: string | undefined | null
    ): Promise<{data: any, error: any}> {
    console.log('called')
    let message_sender: string | null = '';
    if(this.loggedInID) {
      message_sender = this.loggedInID;
    }
    const messageFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('send_message_transaction', {
        room_id_in: room_id,
        message_sender: message_sender,
        message_receiver: message_receiver,
        content_in: content_in,
        is_group: is_group_in,
        group_id_in: group_id_in
      });
     if(messageFeedback.error) throw new Error(messageFeedback.error.message);
    console.log('ended no error');
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
      .single();
    if(results.error) throw new Error(results.error.message);
    return results;
  }

  async acceptChatRequest(room_id: string, loggedInUserId:string): Promise<{data: any, error: any}> {
    const acceptFeedback: {data: any, error: any} = await this.supabaseClient
    .rpc('accept_chat_request', {
      room_id_in: room_id,
      user_id_of_reader: loggedInUserId
    });
  if(acceptFeedback.error) throw new Error(acceptFeedback.error.message);
  return acceptFeedback;
  }

  async getChatPartner(room_id: string): Promise<{data: any, error: any}> {
    let message_sender: string | null = '';
    if(this.loggedInID) {
      message_sender = this.loggedInID;
    }
    const groupFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('select_chat_partner', {
        message_sender: message_sender,
        room_id_in: room_id
      });
    if(groupFeedback.error) throw new Error(groupFeedback.error.message);
    return groupFeedback;
  }

  async rejectChatRequest(room_id: string, chatPartner: string, loggedInID: string): Promise<{data: any, error: any}> {
    const deleteFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('reject_chat_request_transaction', {
        room_id_in: room_id,
        follower_id: chatPartner,
        following_id: loggedInID
      });
    if(deleteFeedback.error) throw new Error(deleteFeedback.error.message);
    return deleteFeedback;
  }

  async getGroupAsChatPartner(room_id: string): Promise<{data: any, error: any}> {
    const groupFeedback: {data: any, error: any} = await this.supabaseClient
      .rpc('select_group_as_chat_partner', {
        room_id_in: room_id
      });
    if(groupFeedback.error) throw new Error(groupFeedback.error.message);
    return groupFeedback;
  }

}
