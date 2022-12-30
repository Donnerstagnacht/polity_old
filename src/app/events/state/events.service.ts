import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { EventsStore, EventsState } from './events.store';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from 'lib/database.types';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';

@Injectable({ providedIn: 'root' })
export class EventsService extends NgEntityService<EventsState> {
  private supabaseClient: SupabaseClient;

  constructor(protected override eventsStore: EventsStore) {
    super(eventsStore);
    this.supabaseClient = createClient<Database>(environment.supabaseUrl, environment.supabaseKey)
  }

  async createEventTransaction(
    newEvent: Event

  ): Promise<{data: any, error: any}> {
  // ): Promise<void> {
    console.log(newEvent)
    const createEventResult: {data: any, error: any} = await this.supabaseClient
      .rpc('create_event_transaction', {
        name: newEvent.name,
        description: newEvent.description,
        creator: newEvent.creator,
        host_group: '308c1b44-8684-47b1-b0da-c45548846046',// newEvent.host_group,
        rythm: newEvent.rythm
      })
    return createEventResult;
  }

}
