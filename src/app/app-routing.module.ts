import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { FollowerManagementComponent } from './following-profiles-system/follower-management/follower-management.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { GroupManagementComponent } from './groups/group-management/group-management.component';
import { MyGroupsListComponent } from './groups/my-groups-list/my-groups-list.component';
import { WikiComponent } from './groups/wiki/wiki.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { EditComponent as EditGComponent } from './groups/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SearchComponent } from './search/search/search.component';
import { EditGroupMembersComponent } from './groups/edit-group-members/edit-group-members.component';
import { EditFollowersComponent } from './groups/edit-followers/edit-followers.component';
import { FollowerGroupManagementComponent } from './following-groups-system/follower-group-management/follower-group-management.component';
import { MembershipGroupManagementComponent } from './membership-group-system/membership-group-management/membership-group-management.component';
import { MembershipUserManagementComponent } from './membership-group-system/membership-user-management/membership-user-management.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile-edit', component: EditComponent},
  {path: 'profile-edit/profile', component: EditProfileComponent},
  {path: 'profile-edit/follower', component: FollowerManagementComponent},
  {path: 'profile-edit/groups', component: MembershipUserManagementComponent},
  {path: 'groups', component: MyGroupsListComponent},
  {path: 'groups/:id', component: WikiComponent},
  {path: 'groups/:id/edit', component: EditGComponent},
  {path: 'groups/:id/edit-overview', component: EditGroupComponent},
  {path: 'groups/:id/edit-follower', component: FollowerGroupManagementComponent},
  {path: 'groups/:id/edit-members', component: MembershipGroupManagementComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search', component: SearchComponent},
  {path: 'über', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
