import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerManagementComponent } from './follower-management/follower-management.component';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { TabViewTableListsModule } from '../UI-elements/tab-view-table-lists/tab-view-table-lists.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';


@NgModule({
  declarations: [
    FollowerManagementComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    RouterModule,
    TabViewModule,
    TableModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    WrapperGridModule,
    BackButtonModule,
    TabViewTableListsModule,
    LoadingSpinnerModule
  ]
})
export class FollowingProfilesSystemModule { }
