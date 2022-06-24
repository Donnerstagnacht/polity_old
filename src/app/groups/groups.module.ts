import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiComponent } from './wiki/wiki.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MyGroupsListComponent } from './my-groups-list/my-groups-list.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SidebarModule} from 'primeng/sidebar';
import {CarouselModule} from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './edit/edit.component';
import { EditGroupMembersComponent } from './edit-group-members/edit-group-members.component';
import { EditFollowersComponent } from './edit-followers/edit-followers.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MembershipGroupSystemModule } from '../membership-group-system/membership-group-system.module';

@NgModule({
  declarations: [
    WikiComponent,
    CreateGroupComponent,
    MyGroupsListComponent,
    GroupManagementComponent,
    EditGroupComponent,
    EditComponent,
    EditGroupMembersComponent,
    EditFollowersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    CarouselModule,
    InputTextareaModule,
    TagModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
    MembershipGroupSystemModule
  ]
})
export class GroupsModule { }
