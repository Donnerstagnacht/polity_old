import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { account } from '../../../types/account';

export interface Profile {
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  public createAccount(account: account): Promise<any> {
    console.log(
      "Form submitted",
      account.name,
      account.email,
      account.password
    );
    return this.signUp(account.email, account.password);
  }

  public login(account: account): void {
    console.log(
      "login",
      account.name,
      account.email,
      account.password
    );
  }

  public logout(): void {}

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
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

  async signIn(email: string, password: string) {
    const response = await this.supabase.auth.signIn({ email, password });
    if (response.error) throw new Error(response.error.message);
  }

  async signOut() {
    const response = await this.supabase.auth.signOut();
    if (response.error) throw new Error(response.error.message);
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }

    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }

}
