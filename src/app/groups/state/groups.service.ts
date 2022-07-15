import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { GroupsStore, GroupsState } from './groups.store';

@Injectable({ providedIn: 'root' })
export class GroupsService extends NgEntityService<GroupsState> {

  constructor(protected store: GroupsStore) {
    super(store);
  }

}
