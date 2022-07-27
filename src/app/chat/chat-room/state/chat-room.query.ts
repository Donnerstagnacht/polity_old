import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Message } from 'src/app/UI-elements/message/message.component';
import { ChatRoomStore, ChatRoomState } from './chat-room.store';

@Injectable({ providedIn: 'root' })
export class ChatRoomQuery extends Query<ChatRoomState> {
  messages$: Observable<Message[]> = this.select(state => state.messages);

  constructor(protected override store: ChatRoomStore) {
    super(store);
  }

}
