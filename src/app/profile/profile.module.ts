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
import {AvatarModule} from 'primeng/avatar';
import {ToastModule} from 'primeng/toast';
import { FollowingProfilesSystemModule } from '../following-profiles-system/following-profiles-system.module';
import { ProfilesRoutingModule } from './profile-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { MenuBarSecondaryRightModule } from '../UI-navigation/menu-bar-secondary-right/menu-bar-secondary-right.module';
import { MenuBarSecondaryTopModule } from '../UI-navigation/menu-bar-secondary-top/menu-bar-secondary-top.module';
import { BackButtonModule } from '../UI-elements/back-button/back-button.module';
import { ListElementModule } from '../UI-elements/list-element/list-element.module';
import { WikiHeaderModule } from '../UI-elements/wiki-header/wiki-header.module';
import { KeyFiguresModule } from '../UI-elements/key-figures/key-figures.module';
import { HeadlineOfListModule } from '../UI-elements/headline-of-list/headline-of-list.module';
import { SwitchThemeModule } from '../UI-structure/switch-theme/switch-theme.module';
import { AboutAndContactModule } from '../UI-elements/about-and-contact/about-and-contact.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';

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
    AvatarModule,
    ToastModule,
    FollowingProfilesSystemModule,
    ProfilesRoutingModule,
    HttpClientModule,
    WrapperGridModule,
    MenuBarSecondaryRightModule,
    MenuBarSecondaryTopModule,
    ToastModule,
    WrapperGridModule,
    BackButtonModule,
    AvatarModule,
    FileUploadModule,
    ListElementModule,
    AboutAndContactModule,
    MessageModule,
    WikiHeaderModule,
    KeyFiguresModule,
    HeadlineOfListModule,
    SwitchThemeModule,
    LoadingSpinnerModule
  ],
})
export class ProfileModule { }
