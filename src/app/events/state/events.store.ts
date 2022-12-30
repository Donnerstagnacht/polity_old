import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Event, EventUI, initialEventUIState } from './event.model';

export interface EventsState extends EntityState<Event> {}
export interface EventUIState extends EntityState<EventUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'events', resettable: true })
export class EventsStore extends EntityStore<EventsState> {
  override ui!: EntityUIStore<EventUIState>;

  constructor() {
    super();
    this.createUIStore({}, {name: 'eventUIStore' , resettable: true} ).setInitialEntityState(initialEventUIState);
  }

  resetUIStore(): void {
    this.ui.reset()
  }

}
