import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgaRoutingModule } from './orga-routing.module';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UINavigationModule } from '../UI-navigation/ui-navigation.module';
import { UIStructureModule } from '../UI-structure/ui-structure.module';


@NgModule({
  declarations: [
    ChatComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    OrgaRoutingModule,
    UINavigationModule,
    UIStructureModule
  ]
})
export class OrgaModule { }
