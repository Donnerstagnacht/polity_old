import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowerGroupManagementComponent } from '../following-groups-system/follower-group-management/follower-group-management.component';
import { MembershipGroupManagementComponent } from '../membership-group-system/membership-group-management/membership-group-management.component';

import { IsGroupAdminGuard } from '../utilities-guards/isGroupAdmin/is-group-admin.guard';
import { IsLoggedInGuard } from '../utilities-guards/isLoggedIn/is-logged-in.guard';

import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditComponent } from './edit/edit.component';
import { MyGroupsListComponent } from './my-groups-list/my-groups-list.component';
import { WikiComponent } from './wiki/wiki.component';
import { EventListComponent } from './event-list/event-list.component';



const routes: Routes = [
  {
    path: '',
    component: MyGroupsListComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: ':id',
    component: WikiComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: ':id/edit',
    component: EditComponent,
    canActivate: [IsLoggedInGuard, IsGroupAdminGuard]
  },
  {
    path: ':id/edit-overview',
    component: EditGroupComponent,
    canActivate: [IsLoggedInGuard, IsGroupAdminGuard]
  },
  {
    path: ':id/edit-follower',
    component: FollowerGroupManagementComponent,
    canActivate: [IsLoggedInGuard, IsGroupAdminGuard]
  },
  {
    path: ':id/edit-members',
    component: MembershipGroupManagementComponent,
    canActivate: [IsLoggedInGuard, IsGroupAdminGuard]
  },
  {
    path: ':id/events',
    component: EventListComponent,
    canActivate: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
