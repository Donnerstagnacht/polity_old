import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map, Observable } from 'rxjs';
import { News } from './news.model';
import { NewsStore, NewsState } from './news.store';

@Injectable({ providedIn: 'root' })
export class NewsQuery extends QueryEntity<NewsState> {
  allNews$: Observable<News[]> = this.selectAll();


  constructor(protected override store: NewsStore) {
    super(store);
  }

  filterAccounts(isAccountOn?: string): Observable<News[]> {
    let news$: Observable<News[]> = this.allNews$;

    if (isAccountOn) {
      news$ = news$.pipe(map((news: News[]) => news.filter((chat: News) =>  chat.type === isAccountOn)));
    }
    return news$;
  }

}
