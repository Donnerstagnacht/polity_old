import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Chat } from './chat.model';
import { ChatQuery } from './chat.query';
import { ChatStore } from './chat.store';

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

}
