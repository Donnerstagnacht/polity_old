import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Group } from '../state/group.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private supabaseClient: SupabaseClient;
  loggedInID: string | null = '';
  authSubscription: Subscription | undefined;

  constructor(
    private readonly authentificationQuery: AuthentificationQuery,
  ) {
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

  async createGroupTransaction(
    newGroup: Group

  ): Promise<{data: any, error: any}> {
    console.log(newGroup)
    const createGroupResult: {data: any, error: any} = await this.supabaseClient
      .rpc('create_group_transaction', {
        name: newGroup.name,
        description: newGroup.description,
        creator: newGroup.creator,
        level: newGroup.level
      })
    return createGroupResult;
  }

  async getAllGroupsOfId(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const groups: {data: any, error: any} = await this.supabaseClient
      .from('group_members')
      .select(
        `
        id,
        group_id,
        groups(
          name,
          level,
          description,
          creator,
          avatar_url
        )`
      )
      .eq('user_id', loggedInID);
    if(groups.error) throw new Error(groups.error.message);
    return groups;
  }

  async isLoggedInUserAdmin(groupId: string):  Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    if(this.loggedInID) {
      loggedInID = this.loggedInID;
    }
    const results: {data: any, error: any} = await this.supabaseClient
    .from('group_members')
    .select(
      `id,
      is_admin`
    )
    .eq('user_id', loggedInID)
    .eq('group_id', groupId)
    .single();
    if(results.error) throw new Error(results.error.message);
    return results;
  }

}
