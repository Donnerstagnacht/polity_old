import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Session } from '@supabase/supabase-js';
import { Profile, SessionResponse } from '../services/authentification.service';

export interface AuthentificationState {
   uuid: string |null,
   profile:Profile | null,
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
