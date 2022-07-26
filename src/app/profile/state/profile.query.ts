import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileStore, ProfileState } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends QueryEntity<ProfileState> {

  constructor(protected override store: ProfileStore) {
    super(store);
  }

  selectProfileById(uuid: string): Observable<Profile | undefined> {
    return this.selectEntity(uuid)
  }

}
