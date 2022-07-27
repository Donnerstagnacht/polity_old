import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Chat } from './chat.model';

export interface ChatState extends EntityState<Chat> {
  ui: {
    filters: {
      name: boolean;
    }
  }

}

const initialState: ChatState = {
  ui: {
    filters: {
      name: false,
    }
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chat', resettable: true })
export class ChatStore extends EntityStore<ChatState> {

  constructor() {
    super(initialState);
  }

}
