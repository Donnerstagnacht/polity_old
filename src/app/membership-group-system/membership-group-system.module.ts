import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipGroupManagementComponent } from './membership-group-management/membership-group-management.component';
import { MembershipUserManagementComponent } from './membership-user-management/membership-user-management.component';
import { RequestMembershipComponent } from './request-membership/request-membership.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { TabViewTableListsModule } from '../UI-elements/tab-view-table-lists/tab-view-table-lists.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';



@NgModule({
  declarations: [
    MembershipGroupManagementComponent,
    MembershipUserManagementComponent,
    RequestMembershipComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    WrapperGridModule,
    ToastModule,
    BackButtonModule,
    TabViewTableListsModule,
    LoadingSpinnerModule
  ],
  exports: [
    RequestMembershipComponent
  ]
})
export class MembershipGroupSystemModule { }
