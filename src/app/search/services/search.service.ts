import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Profile } from 'src/app/authentification/services/authentification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

  /*async searchForResults(searchTerm: string): Promise<{data: any, error: any}> {
    const results: {data: any, error: any} = await this.supabaseClient
      .from('profiles')
      .select(
        `username,
        avatar_url,
        website`
      )
      .eq('city', searchTerm)
    console.log(results);
    return results;
  }*/

  async searchForResults(
    searchTerm: string,
    localFilterOn?: boolean,
    regionalFilterOn?: boolean,
    federalFilterOn?: boolean,

    topicsFilterOn?: boolean,
    filteredTopics?: string[],
    dateRangeFilterOn?: boolean,
    createDateRangeValues?: number[],

    statusOpenOn?: boolean,
    statusClosedOn?: boolean
  ): Promise<{data: any, error: any}> {
    // Builds the search Query
    let searchQuery = this.supabaseClient
      .from('profiles')
      .select(
        `id,
        username,
        avatar_url,
        website`
      )
      .textSearch(
        'fts',
        searchTerm,
        {config: 'german'}
      )
    if(localFilterOn) { searchQuery = searchQuery.eq('levelLocal', localFilterOn)}
    if(regionalFilterOn) { searchQuery = searchQuery.eq('levelRegional', regionalFilterOn,)}
    if(federalFilterOn) { searchQuery = searchQuery.eq('levelFederal', federalFilterOn)}
    if(topicsFilterOn) { searchQuery = searchQuery.eq('topics', filteredTopics)}
    if(dateRangeFilterOn) { searchQuery = searchQuery.eq('', createDateRangeValues)}
    // if(statusOpenOn) { searchQuery = searchQuery.eq('',)}

    // query calls database API
    const results: {data: any, error: any} = await searchQuery;
    console.log(results);
    return results;
  }

}
