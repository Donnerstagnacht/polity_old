import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ProfileCore, ProfileUI } from './profile.model';
import { ProfileStore, ProfileState, ProfileUIState } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends QueryEntity<ProfileState> {
  override ui!: EntityUIQuery<ProfileUIState>;

  constructor(protected override store: ProfileStore) {
    super(store);
    this.createUIQuery();
  }

  selectProfileById(uuid: string): Observable<ProfileCore | undefined> {
    return this.selectEntity(uuid)
  }

  selectUI$(profile_id: string): Observable<ProfileUI | undefined> {
    return this.ui.selectEntity(profile_id);
  }

}
