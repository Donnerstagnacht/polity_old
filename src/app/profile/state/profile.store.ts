import { Injectable } from '@angular/core';
import { EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Profile, ProfileCore, ProfileUI } from './profile.model';

export interface ProfileState extends EntityState<Profile> {}
export interface ProfileUIState extends EntityState<ProfileUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile', resettable: true })
export class ProfileStore extends EntityStore<ProfileState> {
  override ui!: EntityUIStore<ProfileUIState>;

  constructor() {
    super();
    this.createUIStore({}, {name: 'profilesUIStore', resettable: true})
  }

  resetUIStore(): void {
    this.ui.reset()
  }

}
