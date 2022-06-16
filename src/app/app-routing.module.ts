import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { FollowerManagementComponent } from './following-profiles-system/follower-management/follower-management.component';
import { GroupManagementComponent } from './groups/group-management/group-management.component';
import { MyGroupsListComponent } from './groups/my-groups-list/my-groups-list.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SearchComponent } from './search/search/search.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile-edit', component: EditComponent},
  {path: 'profile-edit/profile', component: EditProfileComponent},
  {path: 'profile-edit/follower', component: FollowerManagementComponent},
  {path: 'profile-edit/groups', component: GroupManagementComponent},
  {path: 'groups', component: MyGroupsListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search', component: SearchComponent},
  {path: 'über', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
