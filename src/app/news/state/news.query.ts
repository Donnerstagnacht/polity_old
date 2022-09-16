import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { map, Observable } from 'rxjs';
import { News } from './news.model';
import { NewsStore, NewsState } from './news.store';

@QueryConfig({
  sortBy: 'created_at',
  sortByOrder: Order.DESC
})

@Injectable({ providedIn: 'root' })
export class NewsQuery extends QueryEntity<NewsState> {
  allNews$: Observable<News[]> = this.selectAll();
  lastNews$: Observable<News | undefined> = this.selectFirst();

  constructor(protected override store: NewsStore) {
    super(store);
  }

  filterNewsByType(typeOfNews?: string): Observable<News[]> {
    let news$: Observable<News[]> = this.allNews$;

    if (typeOfNews) {
      news$ = news$.pipe(map((news: News[]) => news.filter((chat: News) =>  chat.type === typeOfNews)));
    }
    return news$;
  }

}
