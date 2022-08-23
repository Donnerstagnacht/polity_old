import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationQuery } from '../../authentification/state/authentification.query';
import { environment } from 'src/environments/environment';
import { Group } from '../state/group.model';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private supabaseClient: SupabaseClient;

  constructor(
    private readonly authentificationQuery: AuthentificationQuery,
    ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
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
  /*TODO*/
  async getAllGroupsOfId(): Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe((uuid: any) => {
      loggedInID = uuid;
    });
    const groups: {data: any, error: any} = await this.supabaseClient
    .from('group_members')
    .select(
      `
      group_id,
      groups(
        name,
        level,
        description,
        creator,
        avatar_url
      )      `
    )
    .eq('user_id', loggedInID)
  return groups;
  }


  async isLoggedInUserAdmin(groupId: string):  Promise<{data: any, error: any}> {
    let loggedInID: string | null = '';
    this.authentificationQuery.uuid$.subscribe(uuid => {
      loggedInID = uuid;
    });
    const results: {data: any, error: any} = await this.supabaseClient
    .from('group_members')
    .select(
      `id,
      is_admin`
    )
    .eq('user_id', loggedInID)
    .eq('group_id', groupId)
    .single()
    return results;
  }

}
