import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowerGroupManagementComponent } from './follower-group-management/follower-group-management.component';
import { ToastModule } from 'primeng/toast';
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';



@NgModule({
  declarations: [
    FollowerGroupManagementComponent,

  ],
  imports: [
    CommonModule,
    ToastModule,
    UIStructureModule,
    UIElementsModule
  ]
})
export class FollowingGroupsSystemModule { }
