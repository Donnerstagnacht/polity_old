import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { createClient, RealtimeSubscription, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private supabaseClient: SupabaseClient;

  constructor(private profileStore: ProfileStore) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)

  }

  add(uuid: string) {
    this.selectProfil(uuid)
    .then((results) => {
      const profile: Profile = results.data;
      // console.log(profile);
      this.profileStore.add(profile);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getRealTimeChanges(uuid: string): RealtimeSubscription {
    const subscription = this.supabaseClient
    .from<Profile>(`profiles:id=eq.${uuid}`)
    .on('UPDATE', (payload) => {
      this.profileStore.update(payload.new.id, payload.new)
    })
    .subscribe()
    return subscription;
  }

  update(id: any, profile: Partial<Profile>) {
    const update = {
      ...profile,
      id: id,
      updated_at: new Date()
    }

    return this.supabaseClient.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    })
    .then(() => {
      //console.log('worked')
      // this.profileStore.update(id, profile);
    });
  }

  remove(id: ID) {
    this.profileStore.remove(id);
  }

  private async selectProfil(uuid: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('profiles')
      .select(
        `id,
        name,
        website,
        avatar_url,
        contact_email,
        contact_phone,
        street,
        post_code,
        city,
        about,
        amendment_counter,
        follower_counter,
        following_counter,
        groups_counter`
      )
      .eq('id', uuid)
      .single()
    // console.log(results);
    return results;
  }


}
