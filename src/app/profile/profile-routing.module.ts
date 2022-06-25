import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowerManagementComponent } from '../following-profiles-system/follower-management/follower-management.component';
import { MembershipUserManagementComponent } from '../membership-group-system/membership-user-management/membership-user-management.component';
import { IsLoggedInGuard } from '../utilities-guards/isLoggedIn/is-logged-in.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  {
    path: '',
     component: ProfileComponent,
     canActivate: [IsLoggedInGuard]
  },

  {
    path: 'edit',
    component: EditComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'edit/profile',
    component: EditProfileComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'edit/follower',
    component: FollowerManagementComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'edit/groups',
    component: MembershipUserManagementComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: ':id',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
