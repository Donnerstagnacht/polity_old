import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NewsModule } from '../news/news.module';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { MenuBarSecondaryRightModule } from '../UI-navigation/menu-bar-secondary-right/menu-bar-secondary-right.module';
import { MenuBarSecondaryTopModule } from '../UI-navigation/menu-bar-secondary-top/menu-bar-secondary-top.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { MessageModule } from '../UI-elements/message/message.module';
import { ChatListItemModule } from '../UI-elements/chat-list-item/chat-list-item.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    OrgaRoutingModule,
    FormsModule,
    ChipModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    WrapperGridModule,
    MenuBarSecondaryRightModule,
    MenuBarSecondaryTopModule,
    NewsModule,
    BackButtonModule,
    MessageModule,
    ChatListItemModule,
    LoadingSpinnerModule,
    VirtualScrollerModule,
    InfiniteScrollModule
  ]
})
export class ChatModule { }
