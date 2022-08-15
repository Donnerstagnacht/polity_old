import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { GroupsStore, GroupsState, GroupUIState, GroupUI } from './groups.store';

@Injectable({ providedIn: 'root' })
export class GroupsQuery extends QueryEntity<GroupsState> {
  override ui!: EntityUIQuery<GroupUIState>;

  // ui$: Observable<GroupUI>() = this.groupsQuery.ui.selectEntity(this.selectedGroupId);


  // selectIsMember$: Observable<boolean> = this.selectEntity(state => state['ui'].isMember)

  constructor(protected override store: GroupsStore) {
    super(store);
    this.createUIQuery();
  }

  selectUI$(group_id: string): Observable<GroupUI | undefined> {
    return this.ui.selectEntity(group_id);
  }

}
