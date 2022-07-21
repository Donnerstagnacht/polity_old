import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { AuthentificationStore, AuthentificationState } from './authentification.store';

@Injectable({ providedIn: 'root' })
export class AuthentificationQuery extends Query<AuthentificationState> {
  uuid$: Observable<string | null> = this.select(state => state.uuid);

  constructor(protected override store: AuthentificationStore) {
    super(store);
  }



}
