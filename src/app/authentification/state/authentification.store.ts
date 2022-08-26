import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ProfileCore } from 'src/app/profile/state/profile.model';
import { SessionResponse } from '../state/authentification.model';

export interface AuthentificationState {
   uuid: string |null,
   profile: ProfileCore | null,
   sessionResponse: SessionResponse | null
}

export function createInitialState(): AuthentificationState {
  return {
    uuid: null,
    profile: null,
    sessionResponse: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authentification', resettable: true })
export class AuthentificationStore extends Store<AuthentificationState> {

  constructor() {
    super(createInitialState());
  }

}
