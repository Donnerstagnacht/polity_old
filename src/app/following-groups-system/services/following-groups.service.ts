import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowingGroupsService {
  private supabaseClient: SupabaseClient;

  constructor(
    private authentificationQuery: AuthentificationQuery) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })

    const results: {data: any, error: any} = await this.supabaseClient
      .from('following_group_system')
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
    .from('following_group_system')
    .select(
      `id,
      follower,
      profiles!following_group_system_follower_fkey (
        id,
        name,
        avatar_url
      )`
    )
    .eq('following', groupId)
  return followers;
  }

  async followTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    const followTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('followgrouptransaction', {followingid: follower, followerid: loggedInID})
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
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
