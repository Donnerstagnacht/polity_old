import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { GroupsStore, GroupsState } from './groups.store';
import { GroupsService as GroupsServiceSupabase } from '../services/groups.service';
import { Group } from './group.model';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class GroupsService extends NgEntityService<GroupsState> {
  private supabaseClient: SupabaseClient;

  constructor(
    protected override groupsStore: GroupsStore,
    private groupsServiceSupabase: GroupsServiceSupabase) {
    super(groupsStore);
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)

  }

  findGroup(uuid: string): void {
    this.selectGroup(uuid)
    .then((results) => {
      const group: Group = results.data;
      console.log(group)
      this.groupsStore.add(group);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getRealTimeChanges(uuid: string): RealtimeSubscription {
    const subscription = this.supabaseClient
    .from<Group>(`groups:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      this.groupsStore.update(payload.new.id, payload.new)
    })
    .subscribe()
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
      .match({id: updateId})
  }

  async selectGroup(uuid: string): Promise<{data: any, error: any}> {
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
    return results;
  }

}
