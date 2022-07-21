import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User, Provider, ApiError } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }



  get user(): User | null {
    return this.supabase.auth.user();
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

