import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
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
  public publicUser = new BehaviorSubject<User | null>(null);
  public loggedInStatus = new BehaviorSubject<boolean>(false);

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

  get user(): User | null {
    return this.supabase.auth.user();
  }

  public isUserLoggedIn(): boolean {
    let user: User | null;
    user = this.user;
    console.log('user' + this.user?.id);
    if (this.user) {
     return true;
    } else {
      return false;
    }
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

  authCheckLogin(): void {
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null): void => {
      if(session?.user) {
        this.loggedInStatus.next(true);
      } else {
        this.loggedInStatus.next(false);
      }
    })
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
    if (response.error) {
      throw new Error(response.error.message)
    }
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
function callback(callback: any, arg1: (event: AuthChangeEvent, session: Session | null) => undefined) {
  throw new Error('Function not implemented.');
}

