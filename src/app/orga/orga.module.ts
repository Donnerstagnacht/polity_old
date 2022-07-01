import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgaRoutingModule } from './orga-routing.module';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UINavigationModule } from '../UI-navigation/ui-navigation.module';
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ChatComponent,
    NotificationsComponent,
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    OrgaRoutingModule,
    UINavigationModule,
    UIStructureModule,
    UIElementsModule,
    FormsModule,
    ChipModule,
    AvatarModule,
    InputTextModule,
    ButtonModule
  ]
})
export class OrgaModule { }
