import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { News } from './news.model';

export interface NewsState extends EntityState<News> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'news' })
export class NewsStore extends EntityStore<NewsState> {

  constructor() {
    super();
  }

}
