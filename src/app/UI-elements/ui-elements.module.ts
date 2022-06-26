import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutAndContactComponent } from './about-and-contact/about-and-contact.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { ChipsPickerComponent } from './chips-picker/chips-picker.component';
import { GroupCardComponent } from './group-card/group-card.component';
import { HeadlineOfListComponent } from './headline-of-list/headline-of-list.component';
import { KeyFiguresComponent } from './key-figures/key-figures.component';
import { ListElementComponent } from './list-element/list-element.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TabViewTableListsComponent } from './tab-view-table-lists/tab-view-table-lists.component';
import { WikiHeaderComponent } from './wiki-header/wiki-header.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    AboutAndContactComponent,
    BackButtonComponent,
    ChipsPickerComponent,
    GroupCardComponent,
    HeadlineOfListComponent,
    KeyFiguresComponent,
    ListElementComponent,
    ProfileCardComponent,
    TabViewTableListsComponent,
    WikiHeaderComponent,
    ChatListItemComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    ChipsModule,
    ChipModule,
    MessageModule,
    MessagesModule,
    AvatarModule,
    TableModule,
    FormsModule,
    RouterModule,
    TagModule,
    BadgeModule


  ], exports: [
    AboutAndContactComponent,
    BackButtonComponent,
    ChipsPickerComponent,
    GroupCardComponent,
    HeadlineOfListComponent,
    KeyFiguresComponent,
    ListElementComponent,
    ProfileCardComponent,
    TabViewTableListsComponent,
    WikiHeaderComponent,
    ChatListItemComponent,
    MessageComponent
  ]
})
export class UIElementsModule { }
