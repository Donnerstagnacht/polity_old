import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async findProfil(uuid: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('profiles')
      .select(
        `id,
        username,
        website,
        avatarUrl,
        contactEmail,
        contactPhone,
        street,
        postCode,
        city,
        about,
        amendmentCounter,
        followerCounter,
        followingCounter,
        groupsCounter`
      )
      .eq('id', uuid)
      .single()
    console.log(results);
    return results;
  }

}
