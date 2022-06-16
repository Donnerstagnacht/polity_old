import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarLeftComponent } from './menu-bar-left/menu-bar-left.component';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuBarBottomComponent } from './menu-bar-bottom/menu-bar-bottom.component';
import { WrapperFullCreenCenterComponent } from './wrapper-full-creen-center/wrapper-full-creen-center.component';
import { AppRoutingModule } from '../app-routing.module';
import { WrapperGridComponent } from './wrapper-grid/wrapper-grid.component';
import { MenuBarSecondaryRightComponent } from './menu-bar-secondary-right/menu-bar-secondary-right.component';
import { MenuBarSecondaryTopComponent } from './menu-bar-secondary-top/menu-bar-secondary-top.component';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { GroupCardComponent } from './group-card/group-card.component';
import { GroupsModule } from '../groups/groups.module';

@NgModule({
  declarations: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent,
    ProfileCardComponent,
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AppRoutingModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    AvatarModule,
    AvatarGroupModule
  ],
  exports: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent,
    ProfileCardComponent,
    GroupCardComponent
  ]
})
export class SharedModule { }
