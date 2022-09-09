import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerGroupManagementComponent } from './follower-group-management/follower-group-management.component';
import { ToastModule } from 'primeng/toast';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { TabViewTableListsModule } from '../UI-elements/tab-view-table-lists/tab-view-table-lists.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    FollowerGroupManagementComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    WrapperGridModule,
    BackButtonModule,
    TabViewTableListsModule,
    LoadingSpinnerModule,
    InfiniteScrollModule
  ]
})
export class FollowingGroupsSystemModule { }
