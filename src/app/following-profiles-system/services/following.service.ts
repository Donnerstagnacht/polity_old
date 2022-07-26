import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  private supabaseClient: SupabaseClient;

  constructor(private authentificationQuery: AuthentificationQuery) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const results: {data: any, error: any} = await this.supabaseClient
      .from('following_profile_system')
      .select(
        `id,
        follower,
        following`
      )
      .eq('follower', loggedInID)
      .eq('following', following)
    return results;

  }

  async getAllFollower(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const followers: {data: any, error: any} = await this.supabaseClient
    .from('following_profile_system')
    .select(
      `id,
      follower,
      profiles!following_profile_system_follower_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('following', loggedInID)
  return followers;
  }

  async getAllFollowing(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const followings: {data: any, error: any} = await this.supabaseClient
    .from('following_profile_system')
    .select(
      `id,
      following,
      profiles!following_profile_system_following_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('follower', loggedInID)
  return followings;
  }

  async followTransaction(following: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const followTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('followtransaction', {followingid: following, followerid: loggedInID})
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: follower, followerid: loggedInID})
    return unfollowTransactionResult;
  }

  async removeFollowerTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: loggedInID, followerid: follower})
    return unfollowTransactionResult;
  }
}
