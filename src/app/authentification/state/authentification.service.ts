import { Inject, Injectable } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { PersistStateStorage } from '@datorama/akita/src/lib/persistState';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ChatRoomStore } from 'src/app/chat/chat-room/state/chat-room.store';
import { ChatStore } from 'src/app/chat/state/chat.store';
import { GroupsStore } from 'src/app/groups/state/groups.store';
import { NewsStore } from 'src/app/news/state/news.store';
import { ProfileStore } from 'src/app/profile/state/profile.store';
import { environment } from 'src/environments/environment';
import { Account } from 'src/types/account';
import { SessionResponse } from './authentification.model';
import { AuthentificationStore } from './authentification.store';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  private supabaseClient: SupabaseClient;

  constructor(
    @Inject('persistStorage') private persistStorage: PersistStateStorage,
    private authentificationStore: AuthentificationStore,
    private profileStore: ProfileStore,
    private groupStore: GroupsStore,
    private newsStore: NewsStore,
    private chatStore: ChatStore,
    private chatRoomStore: ChatRoomStore
  ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async signIn(email: string, password: string) {
    const response: SessionResponse = await this.supabaseClient.auth.signIn({ email, password });
    if (response.error) throw new Error(response.error.message);
    this.authentificationStore.update({
      sessionResponse: response,
      uuid: response.user?.id
    })
  }

  async signOut() {
    const response = await this.supabaseClient.auth.signOut();
    
    if (response.error) {
      throw new Error(response.error.message);
    }

    this.supabaseClient.removeAllSubscriptions();

    this.authentificationStore.reset();
    this.profileStore.reset();
    this.groupStore.reset();
    this.groupStore.ui.reset();
    this.groupStore.resetUIStore();
    this.profileStore.resetUIStore();
    this.newsStore.reset();
    this.chatRoomStore.reset();
    this.chatStore.reset();
    resetStores();
    this.persistStorage.clear();
  }

  async signUp(account: Account): Promise<any> {
    const email = account.email;
    const password = account.password;
    const response = await this.supabaseClient.auth.signUp({ email, password });
    if (response.error) throw new Error(response.error.message);
  }

}
