import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowingGroupsService {
  private supabaseClient: SupabaseClient;

  constructor(private authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const results: {data: any, error: any} = await this.supabaseClient
      .from('following-group-system')
      .select(
        `id,
        follower,
        following`
      )
      .eq('follower', loggedInID)
      .eq('following', following)
    return results;

  }

  async getAllFollower(groupId: string): Promise<{data: any, error: any}> {
    const followers: {data: any, error: any} = await this.supabaseClient
    .from('following-group-system')
    .select(
      `id,
      follower,
      profiles!following-group-system_follower_fkey (
        id,
        username,
        avatarUrl
      )`
    )
    .eq('following', groupId)
  return followers;
  }

/*   async getAllFollowing(): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const followings: {data: any, error: any} = await this.supabaseClient
    .from('following-group-system')
    .select(
      `id,
      following,
      profiles!following-group-system_following_fkey (
        id,
        username,
        avatarUrl
      )`
    )
    .eq('follower', loggedInID)
  return followings;
  } */

  async followTransaction(follower: string): Promise<{data: any, error: any}> {
    console.log(follower)
    const loggedInID = this.authentificationService.user?.id;
    console.log(loggedInID)
    const followTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('followgrouptransaction', {followingid: follower, followerid: loggedInID})
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    const loggedInID = this.authentificationService.user?.id;
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowgrouptransaction', {followingid: follower, followerid: loggedInID})
    return unfollowTransactionResult;
  }

  async removeFollowerTransaction(follower: string, groupId: string): Promise<{data: any, error: any}> {
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowgrouptransaction', {followingid: groupId, followerid: follower})
    return unfollowTransactionResult;
  }

}
