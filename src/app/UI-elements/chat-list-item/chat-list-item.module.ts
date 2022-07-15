import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ChatListItemComponent } from './chat-list-item.component';



@NgModule({
  declarations: [
    ChatListItemComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    AvatarModule
  ],
  exports: [
    ChatListItemComponent
  ]
})
export class ChatListItemModule { }
