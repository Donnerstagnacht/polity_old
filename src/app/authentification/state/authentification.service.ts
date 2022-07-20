import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { SessionResponse } from '../services/authentification.service';
import { AuthentificationStore } from './authentification.store';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  private supabaseClient: SupabaseClient;

  constructor(
    private authentificationStore: AuthentificationStore
  ) {
      this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }


  async signIn(email: string, password: string) {
    const response: SessionResponse = await this.supabaseClient.auth.signIn({ email, password })
    .then((response: SessionResponse) => {
      console.log('welcome')
      console.log(response);
      return response;
    })
    ;
    if (response.error) throw new Error(response.error.message);
    console.log('success')
    this.authentificationStore.update({
      sessionResponse: response,
      uuid: response.user?.id
    })
  }

  async signOut() {
    const response = await this.supabaseClient.auth.signOut();
    this.authentificationStore.reset();
    if (response.error) {
      throw new Error(response.error.message)
    }
  }

}
