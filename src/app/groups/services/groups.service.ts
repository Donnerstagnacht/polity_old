import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';
import { Group } from '../../UI-dialogs/create-group/create-group.component';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private supabaseClient: SupabaseClient;

  constructor(
    private readonly authentificationService: AuthentificationService,
    ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  async createGroupTransaction(
    newGroup: Group

  ): Promise<{data: any, error: any}> {
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
    const loggedInID = this.authentificationService.user?.id;
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
    const loggedInID = this.authentificationService.user?.id;
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
