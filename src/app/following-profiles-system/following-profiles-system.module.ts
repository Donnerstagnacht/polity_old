import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerManagementComponent } from './follower-management/follower-management.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    FollowerManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastModule,
    RouterModule,
    TabViewModule,
    TableModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class FollowingProfilesSystemModule { }
