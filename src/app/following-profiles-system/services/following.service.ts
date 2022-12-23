import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { NewsContents, NewsTitles, NEWSCONTENTS, NEWSTITLES, NewsType, NEWSTYPE } from '../../news/state/news.model';
@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  private supabaseClient: SupabaseClient;
  loggedInID: string | null = '';
  authSubscription: Subscription | undefined;
  NEWSCONTENTS: NewsContents = NEWSCONTENTS;
  NEWSTITILES: NewsTitles = NEWSTITLES;
  NEWSTYPE: NewsType = NEWSTYPE;

  constructor(private authentificationQuery: AuthentificationQuery) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authSubscription = this.authentificationQuery.uuid$.subscribe(uuid => {
      this.loggedInID = uuid;
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async isAlreadyFollower(following: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const results: {data: any, error: any} = await this.supabaseClient
      .from('following_profile_system')
      .select(
        `
        follower,
        following`
      )
      .eq('follower', loggedInID)
      .eq('following', following)
    return results;

  }

  async getAllFollower(user_id?: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    let userToFetch: string;
    if(user_id) {
      userToFetch = user_id;
    } else {
      userToFetch = loggedInID;
    }
    const followers: {data: any, error: any} = await this.supabaseClient
      .from('following_profile_system')
      .select(
        `
        follower,
        profiles!following_profile_system_follower_fkey (
          id,
          name,
          avatar_url
        )`
      )
      .eq('following', userToFetch)
    if(followers.error) throw new Error(followers.error.message);
    return followers;
  }

  async getAllFollowing(user_id?: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    let userToFetch: string;
    if(user_id) {
      userToFetch = user_id;
    } else {
      userToFetch = loggedInID;
    }
    const followings: {data: any, error: any} = await this.supabaseClient
    .from('following_profile_system')
    .select(
      `
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
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const followTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('followtransaction', {
        followingid: following,
        followerid: loggedInID,
        title_in: NEWSTITLES.followUser,
        message_in: NEWSCONTENTS.followUser,
        type_in: NEWSTYPE.account,
        for_admins_in: false
      });
    if(followTransactionResult.error) throw new Error(followTransactionResult.error.message);
    return followTransactionResult;
  }

  async unfollowTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: follower, followerid: loggedInID});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

  async removeFollowerTransaction(follower: string): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: loggedInID, followerid: follower});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

  async removeFollowerTransactionFromEvent(event: {id: string, user_id: string}): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
      .rpc('unfollowtransaction', {followingid: loggedInID, followerid: event.user_id});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

  async removeFollowerTransactionById(event: {id: string, user_id: string}): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const unfollowTransactionResult: { data: any, error: any } = await this.supabaseClient
    .rpc('unfollow_transaction_by_id', {followingid: loggedInID, followerid: event.user_id, relationship_id: event.id});
    if(unfollowTransactionResult.error) throw new Error(unfollowTransactionResult.error.message);
    return unfollowTransactionResult;
  }

}
