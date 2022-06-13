import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerManagementComponent } from './follower-management/follower-management.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';


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
  ]
})
export class FollowingProfilesSystemModule { }
