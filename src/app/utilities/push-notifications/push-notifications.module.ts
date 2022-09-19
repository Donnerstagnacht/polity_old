import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationsComponent } from './push-notifications.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    PushNotificationsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    PushNotificationsComponent
  ]
})
export class PushNotificationsModule { }
