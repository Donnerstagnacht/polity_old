import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, SupabaseClient, Session, User, Provider, ApiError } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { account } from '../../../types/account';

export interface Profile {
  amendment_counter: number;
  follower_counter: number;
  following_counter: number;
  groups_counter: number;
  id: string;
  name: string;
  website: string;
  avatar_url: string;
  contact_email: string;
  contact_phone: string;
  street: string;
  post_code: string;
  city: string;
  about: string;
}

export interface SessionResponse {
    session: Session | null,
    user: User | null,
    provider?: Provider | undefined,
    url?: string | null | undefined,
    error: ApiError | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private supabase: SupabaseClient;
  public publicUser = new BehaviorSubject<User | null>(null);
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   public getLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus;
   }

  public createAccount(account: account): Promise<any> {
    return this.signUp(account.email, account.password);
  }

  get user(): User | null {
    return this.supabase.auth.user();
  }

  public isUserLoggedIn(): boolean {
    let user: User | null;
    user = this.user;
    if (this.user) {
     return true;
    } else {
      return false;
    }
  }


  get profile() {
    return this.supabase
      .from('profiles')
      .select(
        `id,
        name,
        website,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        about`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signUp(email: string, password: string): Promise<any> {
    const response = await this.supabase.auth.signUp({ email, password });
    if (response.error) throw new Error(response.error.message);
  }

  updateProfile(profile: Partial<Profile>) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

}

