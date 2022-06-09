import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import {TabViewModule} from 'primeng/tabview';
import { EditComponent } from './edit/edit.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule
  ]
})
export class ProfileModule { }
