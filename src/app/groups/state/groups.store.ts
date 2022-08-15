import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Group, GroupUI, initialGroupUIState } from './group.model';

export interface GroupsState extends EntityState<Group> {}
export interface GroupUIState extends EntityState<GroupUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'groups', resettable: true })
export class GroupsStore extends EntityStore<GroupsState> {
  override ui!: EntityUIStore<GroupUIState>;

  constructor() {
    super();
    this.createUIStore({}, {name: 'groupsUIStore' , resettable: true} ).setInitialEntityState(initialGroupUIState);
  }

  resetUIStore(): void {
    this.ui.reset()
  }

}
