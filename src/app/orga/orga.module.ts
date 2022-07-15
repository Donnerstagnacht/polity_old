import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaRoutingModule } from './orga-routing.module';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
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

@NgModule({
  declarations: [
    ChatComponent,
    NotificationsComponent,
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
    ChatListItemModule
  ]
})
export class OrgaModule { }
