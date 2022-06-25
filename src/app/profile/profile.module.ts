import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
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
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {AvatarModule} from 'primeng/avatar';
import {ToastModule} from 'primeng/toast';
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UINavigationModule } from '../UI-navigation/ui-navigation.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';
import { FollowingProfilesSystemModule } from '../following-profiles-system/following-profiles-system.module';

@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    AvatarModule,
    ToastModule,
    UIStructureModule,
    UINavigationModule,
    UIElementsModule,
    FollowingProfilesSystemModule
  ],
})
export class ProfileModule { }
