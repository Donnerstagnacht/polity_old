import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  public async searchForResults(searchTerm: string): Promise<any> {
    console.log(searchTerm);
    const data: {data: any, error: any} = await this.supabaseClient
      .from('profiles')
      .select(
        `username,
        website`
      );
    console.log(data);
  }
}
