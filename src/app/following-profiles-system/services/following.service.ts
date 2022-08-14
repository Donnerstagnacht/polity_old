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

  async getAllFollower(user_id?: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    let userToFetch: string;
    if(user_id) {
      userToFetch = user_id;
    } else {
      userToFetch = loggedInID;
    }
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
    .eq('following', userToFetch)
  return followers;
  }

  async getAllFollowing(user_id?: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    let userToFetch: string;
    if(user_id) {
      userToFetch = user_id;
    } else {
      userToFetch = loggedInID;
    }
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
    .eq('follower', userToFetch)
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

  async removeFollowerTransactionById(event: {id: string, user_id: string}): Promise<{data: any, error: any}> {
    console.log(event)
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollow_transaction_by_id', {followingid: loggedInID, followerid: event.user_id, relationship_id: event.id})
    return unfollowTransactionResult;
  }
}
