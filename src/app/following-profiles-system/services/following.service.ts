import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  private supabaseClient: SupabaseClient;

  constructor(private authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async follow(following: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const insertData: {data: any, error: any} = await this.supabaseClient
      .from('following-profile-system')
      .insert([
        {
          follower: loggedInID,
          following: following
        }
      ])
      return insertData;
  }

  async unFollow(following: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const deletedData: {data: any, error: any} = await this.supabaseClient
      .from('following-profile-system')
      .delete()
      .match({
        follower: loggedInID,
        following: following
      })
    return deletedData;
  }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const results: {data: any, error: any} = await this.supabaseClient
      .from('following-profile-system')
      .select(
        `id,
        follower,
        following`
      )
      .eq('follower', loggedInID)
      .eq('following', following)
    return results;

  }

  isAlreadyFollowing(follower: string, following: string): void {
  }

  getAllFollower(): void {}

  getAllFollowing(): void {}
}
