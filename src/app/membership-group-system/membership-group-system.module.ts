import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipGroupManagementComponent } from './membership-group-management/membership-group-management.component';
import { MembershipUserManagementComponent } from './membership-user-management/membership-user-management.component';
import { RequestMembershipComponent } from './request-membership/request-membership.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MembershipGroupManagementComponent,
    MembershipUserManagementComponent,
    RequestMembershipComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    RequestMembershipComponent
  ]
})
export class MembershipGroupSystemModule { }
