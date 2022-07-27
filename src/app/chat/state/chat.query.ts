import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map, Observable } from 'rxjs';
import { ThemeService } from 'src/app/UI-structure/theme.service';
import { Chat } from './chat.model';
import { ChatStore, ChatState } from './chat.store';

@Injectable({ providedIn: 'root' })
export class ChatQuery extends QueryEntity<ChatState> {
  allChats$: Observable<Chat[]> = this.selectAll();

  constructor(protected override store: ChatStore) {
    super(store);
  }

  filterData(searchTerm: string, isGroupFilterOn: boolean): Observable<Chat[]> {
    let chats$: Observable<Chat[]> = this.allChats$;

    if (isGroupFilterOn) {
      chats$ = chats$.pipe(map((chats: Chat[]) => chats.filter((chat: Chat) =>  chat.is_group === true)));
    }

    if (searchTerm !== '') {
      chats$ = chats$.pipe(map((chats: Chat[]) => chats.filter((chat: Chat) =>  chat.name.includes(searchTerm))))
    }

    return chats$;
  }

}
