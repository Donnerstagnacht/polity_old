import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { FollowerManagementComponent } from './following-profiles-system/follower-management/follower-management.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { MyGroupsListComponent } from './groups/my-groups-list/my-groups-list.component';
import { WikiComponent } from './groups/wiki/wiki.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { EditComponent as EditGComponent } from './groups/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SearchComponent } from './search/search/search.component';
import { FollowerGroupManagementComponent } from './following-groups-system/follower-group-management/follower-group-management.component';
import { MembershipGroupManagementComponent } from './membership-group-system/membership-group-management/membership-group-management.component';
import { MembershipUserManagementComponent } from './membership-group-system/membership-user-management/membership-user-management.component';
import { IsGroupAdminGuard } from './utilities-guards/isGroupAdmin/is-group-admin.guard';
import { IsLoggedInGuard } from './utilities-guards/isLoggedIn/is-logged-in.guard';
import { CreateGroupComponent } from './groups/create-group/create-group.component';

const routes: Routes = [
  {path: 'test', component: CreateGroupComponent},

  {path: '', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'über', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profile-edit', component: EditComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profile-edit/profile', component: EditProfileComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profile-edit/follower', component: FollowerManagementComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profile-edit/groups', component: MembershipUserManagementComponent, canActivate: [IsLoggedInGuard]},
  {path: 'groups', component: MyGroupsListComponent, canActivate: [IsLoggedInGuard]},
  {path: 'groups/:id', component: WikiComponent, canActivate: [IsLoggedInGuard]},
  {path: 'groups/:id/edit', component: EditGComponent, canActivate: [IsLoggedInGuard, IsGroupAdminGuard]},
  {path: 'groups/:id/edit-overview', component: EditGroupComponent, canActivate: [IsLoggedInGuard, IsGroupAdminGuard]},
  {path: 'groups/:id/edit-follower', component: FollowerGroupManagementComponent, canActivate: [IsLoggedInGuard, IsGroupAdminGuard]},
  {path: 'groups/:id/edit-members', component: MembershipGroupManagementComponent, canActivate: [IsLoggedInGuard, IsGroupAdminGuard]},
  {path: 'search', component: SearchComponent, canActivate: [IsLoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
