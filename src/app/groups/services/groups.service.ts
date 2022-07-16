import { Injectable } from '@angular/core';
import { createClient, Subscription, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseRealtimeClient } from '@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';
import { Group } from '../../UI-dialogs/create-group/create-group.component';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private supabaseClient: SupabaseClient;

  // groupAsPromise = new Promise<Group | null>
  groupSubject = new BehaviorSubject<Group | null>(null);

  constructor(private readonly authentificationService: AuthentificationService) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  public getGroup(): Observable<Group | null> {
    return this.groupSubject.asObservable();
  }

  createGroup(): void {}

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

  async findGroup(uuid: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from<Group>('groups')
      .select(
        `id,
        name,
        description,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        level,
        amendment_counter,
        follower_counter,
        events_counter,
        member_counter`
      )
      .eq('id', uuid)
      .single()
/*       .then((payload) => {
        console.log('fetchd');
        console.log(payload);
        this.groupSubject.next(payload.data)
        return results;
      })
      this.getRealTimeChanges(); */
    return results;
  }

  getRealTimeChanges(): SupabaseRealtimeClient {
    const subscription = this.supabaseClient
    .from<Group>('groups')
    .on('UPDATE', (payload) => {
      console.log('service')
      console.log(
        payload.new,
        payload.new.city
        )
      this.groupSubject.next(payload.new);
    })
    return subscription;
  }

  updateGroup(group: Partial<Group>, id: string | undefined) {
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
