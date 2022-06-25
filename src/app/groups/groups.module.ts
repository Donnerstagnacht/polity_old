import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiComponent } from './wiki/wiki.component';
import { CreateGroupComponent } from '../UI-dialogs/create-group/create-group.component';
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
import { CarouselModule } from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { AvatarModule} from 'primeng/avatar';
import { AvatarGroupModule} from 'primeng/avatargroup';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './edit/edit.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MembershipGroupSystemModule } from '../membership-group-system/membership-group-system.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UINavigationModule } from '../UI-navigation/ui-navigation.module';
import { FollowingGroupsSystemModule } from '../following-groups-system/following-groups-system.module';
import { GroupsRoutingModule } from './groups-routing.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    WikiComponent,
    // CreateGroupComponent,
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
    UIElementsModule,
    UIStructureModule,
    UINavigationModule,
    FollowingGroupsSystemModule,
    GroupsRoutingModule,
    HttpClientModule
  ]
})
export class GroupsModule { }
