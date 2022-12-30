import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { EventsStore, EventsState, EventUIState } from './events.store';
import { Observable } from 'rxjs';
import { EventUI } from './event.model';

@Injectable({ providedIn: 'root' })
export class EventsQuery extends QueryEntity<EventsState> {
  override ui!: EntityUIQuery<EventUIState>;

  constructor(protected override store: EventsStore) {
    super(store);
    this.createUIQuery();
  }

  selectUI$(event_id: string): Observable<EventUI | undefined> {
    return this.ui.selectEntity(event_id);
  }
}
