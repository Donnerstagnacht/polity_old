import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Profile } from './profile.model';

export interface ProfileState extends EntityState<Profile> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile', resettable: true })
export class ProfileStore extends EntityStore<ProfileState> {

  constructor() {
    super();
  }

}
