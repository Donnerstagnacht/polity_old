import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../utilities-guards/isLoggedIn/is-logged-in.guard';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'news',
    component: NotificationsComponent,
    canActivate: [IsLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgaRoutingModule { }
