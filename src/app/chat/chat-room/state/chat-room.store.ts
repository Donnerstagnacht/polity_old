import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Messages } from 'primeng/messages';
import { Message } from 'src/app/UI-elements/message/message.component';

export interface ChatRoomState {
  messages: Message[]
}

export function createInitialState(): ChatRoomState {
  return {
    messages: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chat-room', resettable: true })
export class ChatRoomStore extends Store<ChatRoomState> {

  constructor() {
    super(createInitialState());
  }

}
