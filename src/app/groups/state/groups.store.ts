import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Group } from './group.model';


export type GroupUI = {
  isFollowing: boolean;
  isAdmin: boolean;
  requestedMembership: boolean;
  isMember: boolean;
}

export const initialGroupState = {
  isFollowing: false,
  isAdmin: false,
  requestedMembership: false,
  isMember: false
}

export interface GroupsState extends EntityState<Group> {}
export interface GroupUIState extends EntityState<GroupUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'groups', resettable: true })
export class GroupsStore extends EntityStore<GroupsState> {
  override ui!: EntityUIStore<GroupUIState>;

  constructor() {
    super();
    this.createUIStore({}, {name: 'groupsUIStore' , resettable: true} ).setInitialEntityState(initialGroupState);
  }

  resetUIStore(): void {
    this.ui.reset()
  }

}
