import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { News } from './news.model';
import { Subscription, Subject, Observable } from 'rxjs';

export interface NewsState extends EntityState<News> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'news', resettable: true })
export class NewsStore extends EntityStore<NewsState> {

  constructor() {
    super();
  }

}
