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
import { InputTextarea } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


@NgModule({
  declarations: [
    WikiComponent,
    CreateGroupComponent,
    MyGroupsListComponent,
    GroupManagementComponent
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
    // InputTextarea,
    TabViewModule,
    MessagesModule,
    MessageModule

  ]
})
export class GroupsModule { }
