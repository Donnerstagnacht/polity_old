import { Injectable } from '@angular/core';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';

import { environment } from 'src/environments/environment';
import { GroupsService } from 'src/app/groups/state/groups.service';
import { result } from 'cypress/types/lodash';

@Injectable({
  providedIn: 'root'
})
export class FollowingGroupsService {
  private supabaseClient: SupabaseClient;

  constructor(
    private authentificationQuery: AuthentificationQuery,
    private groupsService: GroupsService) {
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
      .eq('following', following);
    if(results.data[0] === undefined) throw new Error('no data')
    if(results.error) throw new Error(results.error.message);
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
    if(followTransactionResult.error) throw new Error(followTransactionResult.error.message);
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowgrouptransaction', {followingid: follower, followerid: loggedInID});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

  async removeFollowerTransaction(follower: string, groupId: string): Promise<{data: any, error: any}> {
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowgrouptransaction', {followingid: groupId, followerid: follower});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

  getRealTimeChangesIfStillFollower(group_id: string): RealtimeSubscription {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    })
/*     console.log('Is still follower called?')
    console.log(loggedInID) */
    const subscription = this.supabaseClient
    .from<any>(`following_group_system`)
    .on('INSERT', (payload) => {
      console.log('Payload')
      console.log(payload)
      if(payload.new.following === group_id && payload.new.follower === loggedInID) {
        this.groupsService.updateIsFollowing(group_id, true);
      }
    })
    .on('DELETE', (payload) => {
      console.log('Payload')
      console.log(payload)
      console.log('group.id_')
      console.log(payload.old.following)
      console.log(group_id)
      if(payload.old.following === group_id && payload.old.follower === loggedInID) {
        this.groupsService.updateIsFollowing(group_id, false);
      }
    })
    .subscribe()
    return subscription;
  }


}
