import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerGroupManagementComponent } from './follower-group-management/follower-group-management.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    FollowerGroupManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastModule
  ]
})
export class FollowingGroupsSystemModule { }
