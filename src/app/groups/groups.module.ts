import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiComponent } from './wiki/wiki.component';
import { MyGroupsListComponent } from './my-groups-list/my-groups-list.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { AvatarModule} from 'primeng/avatar';
import { AvatarGroupModule} from 'primeng/avatargroup';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './edit/edit.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MembershipGroupSystemModule } from '../membership-group-system/membership-group-system.module';
import { FollowingGroupsSystemModule } from '../following-groups-system/following-groups-system.module';
import { GroupsRoutingModule } from './groups-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { MenuBarSecondaryRightModule } from '../UI-navigation/menu-bar-secondary-right/menu-bar-secondary-right.module';
import { MenuBarSecondaryTopModule } from '../UI-navigation/menu-bar-secondary-top/menu-bar-secondary-top.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { ListElementModule } from '../UI-elements/list-element/list-element.module';
import { HeadlineOfListModule } from '../UI-elements/headline-of-list/headline-of-list.module';
import { AboutAndContactModule } from '../UI-elements/about-and-contact/about-and-contact.module';
import { WikiHeaderModule } from '../UI-elements/wiki-header/wiki-header.module';
import { KeyFiguresModule } from '../UI-elements/key-figures/key-figures.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    WikiComponent,
    MyGroupsListComponent,
    EditGroupComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    InputTextareaModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
    MembershipGroupSystemModule,
    TagModule,
    MenuBarSecondaryRightModule,
    MenuBarSecondaryTopModule,
    FollowingGroupsSystemModule,
    GroupsRoutingModule,
    WrapperGridModule,
    BackButtonModule,
    ListElementModule,
    HeadlineOfListModule,
    AboutAndContactModule,
    WikiHeaderModule,
    KeyFiguresModule,
    HttpClientModule,
    LoadingSpinnerModule
  ]
})
export class GroupsModule { }
