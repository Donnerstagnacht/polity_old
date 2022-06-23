import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { account } from '../../../types/account';

export interface Profile {
  amendmentCounter: number;
  followerCounter: number;
  followingCounter: number;
  groupsCounter: number;
  id: string;
  username: string;
  website: string;
  avatarUrl: string;
  contactEmail: string;
  contactPhone: string;
  street: string;
  postCode: string;
  city: string;
  about: string;
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

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(
        `id,
        username,
        website,
        avatarUrl,
        contactEmail,
        contactPhone,
        street,
        postCode,
        city,
        about`)
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
    this.loggedInStatus.next(true);
    console.log(this.loggedInStatus)
    console.log(this.loggedInStatus)
    if (response.error) throw new Error(response.error.message);
  }

  async signOut() {
    const response = await this.supabase.auth.signOut();
    this.loggedInStatus.next(false);
    if (response.error) {
      throw new Error(response.error.message)
    }
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

  async deleteAvatar(path: string) {
    console.warn('deleteAvatar', path)
    const response = await this.supabase.storage.from('avatars').remove([path]);
    if (response.error) throw Error('Removal of old avatar failed.');
    return true;
  }

  getPublicUrl(path: string) {
    console.warn('getPublicUrl', path)
    const response = this.supabase.storage.from('avatars').getPublicUrl(path);
    if (response.error) throw Error('Avatar upload failed.');
    return response.data!.publicURL;
  }

  async uploadAvatar(
    filePath: string,
    file: File,
    oldFilePath: string | undefined,
  ) {
    console.log('authService: ' + filePath)
    console.log('authService2: ' + file)
    const response = await this.supabase.storage
      .from('avatars')
      .upload(filePath, file);
    if (response.error) throw Error('Avatar upload failed.');
    const oldAvatar: string = oldFilePath ? oldFilePath.split('public/avatars/')[1] : '';
    if (oldAvatar) await this.deleteAvatar(oldAvatar);
    return this.getPublicUrl(filePath);
  }

}
function callback(callback: any, arg1: (event: AuthChangeEvent, session: Session | null) => undefined) {
  throw new Error('Function not implemented.');
}

