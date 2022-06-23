import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';
import { Group } from '../create-group/create-group.component';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private supabaseClient: SupabaseClient;

  constructor(private readonly authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  createGroup(): void {}

  async createGroupTransaction(
    newGroup: Group

  ): Promise<{data: any, error: any}> {
    console.log('clicked');
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
    .from('groupMembers')
    .select(
      `
      group_id,
      groups(
        name,
        level,
        description,
        creator
      )
      `
    )
    .eq('user_id', loggedInID)
  return groups;
  }

  async findGroup(uuid: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('groups')
      .select(
        `id,
        name,
        description,
        avatarUrl,
        contactEmail,
        contactPhone,
        street,
        postCode,
        city,
        level,
        amendmentCounter,
        followerCounter,
        eventsCounter,
        memberCounter`
      )
      .eq('id', uuid)
      .single()
    console.log(results);
    return results;
  }

  updateGroup(group: Partial<Group>, id: string | undefined) {
    console.log(group)
    const update = {
      ...group
      // updated_at: new Date()
    }
    let updateId = group.id;
    if (id) {
      updateId = id
    }

    return this.supabaseClient
      .from('groups')
      .update(update, {
      returning: 'minimal', // Don't return the value after inserting
      })
      .match({id: updateId});
  }

  async uploadAvatar(
    filePath: string,
    file: File,
    oldFilePath: string | undefined,
  ) {
    console.log('authService: ' + filePath)
    console.log('authService2: ' + file)
    const response = await this.supabaseClient.storage
      .from('avatars')
      .upload(filePath, file);
    if (response.error) throw Error('Avatar upload failed.');
    const oldAvatar: string = oldFilePath ? oldFilePath.split('public/avatars/')[1] : '';
    if (oldAvatar) await this.deleteAvatar(oldAvatar);
    return this.getPublicUrl(filePath);
  }

  async deleteAvatar(path: string) {
    console.warn('deleteAvatar', path)
    const response = await this.supabaseClient.storage.from('avatars').remove([path]);
    if (response.error) throw Error('Removal of old avatar failed.');
    return true;
  }

  getPublicUrl(path: string) {
    console.warn('getPublicUrl', path)
    const response = this.supabaseClient.storage.from('avatars').getPublicUrl(path);
    if (response.error) throw Error('Avatar upload failed.');
    return response.data!.publicURL;
  }

}
