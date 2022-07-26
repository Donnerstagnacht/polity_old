import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Group } from './group.model';

export interface GroupsState extends EntityState<Group> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'groups', resettable: true })
export class GroupsStore extends EntityStore<GroupsState> {

  constructor() {
    super();
  }

}
