import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowerManagementComponent } from './following-profiles-system/follower-management/follower-management.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { MembershipUserManagementComponent } from './membership-group-system/membership-user-management/membership-user-management.component';
import { IsLoggedInGuard } from './utilities-guards/isLoggedIn/is-logged-in.guard';
import { CreateGroupComponent } from './groups/create-group/create-group.component';

const routes: Routes = [
  {
    path: 'test',
    component: CreateGroupComponent
  },
  {
    path: '',
    loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },

  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
