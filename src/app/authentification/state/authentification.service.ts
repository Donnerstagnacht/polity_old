import { Inject, Injectable } from '@angular/core';
import { PersistStateStorage } from '@datorama/akita/src/lib/persistState';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GroupsStore } from 'src/app/groups/state/groups.store';
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
    private groupStore: GroupsStore
  ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async signIn(email: string, password: string) {
    const response: SessionResponse = await this.supabaseClient.auth.signIn({ email, password })
    .then((response: SessionResponse) => {
      return response;
    });
    if (response.error) throw new Error(response.error.message);
    this.authentificationStore.update({
      sessionResponse: response,
      uuid: response.user?.id
    })
  }

  async signOut() {
    const response = await this.supabaseClient.auth.signOut();
    this.authentificationStore.reset();
    this.profileStore.reset();
    this.groupStore.reset();
    this.persistStorage.clear();
    if (response.error) {
      throw new Error(response.error.message);
    }
  }

  async signUp(account: Account): Promise<any> {
    const email = account.email;
    const password = account.password;
    const response = await this.supabaseClient.auth.signUp({ email, password });
    if (response.error) throw new Error(response.error.message);
  }

}
