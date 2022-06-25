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
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';


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
    UIStructureModule,
    UIElementsModule
  ]
})
export class FollowingProfilesSystemModule { }
