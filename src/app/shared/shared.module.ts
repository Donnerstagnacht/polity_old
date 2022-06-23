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
import { ActionsOverlayComponent } from './actions-overlay/actions-overlay.component';
import {DividerModule} from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { ChipsPickerComponent } from './UI/chips-picker/chips-picker.component';
import { ChipModule } from 'primeng/chip';
import { KeyFiguresComponent } from './UI/key-figures/key-figures.component';
import { AboutAndContactComponent } from './UI/about-and-contact/about-and-contact.component';
import { TabViewModule } from 'primeng/tabview';
import { HeadlineOfListComponent } from './UI/headline-of-list/headline-of-list.component';
import { ListElementComponent } from './UI/list-element/list-element.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { BackButtonComponent } from './UI/back-button/back-button.component';
import { WikiHeaderComponent } from './UI/wiki-header/wiki-header.component';

@NgModule({
  declarations: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent,
    ProfileCardComponent,
    GroupCardComponent,
    ActionsOverlayComponent,
    ChipsPickerComponent,
    KeyFiguresComponent,
    AboutAndContactComponent,
    HeadlineOfListComponent,
    ListElementComponent,
    BackButtonComponent,
    WikiHeaderComponent
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
    AvatarGroupModule,
    DividerModule,
    ChipsModule,
    ChipModule,
    TabViewModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent,
    ProfileCardComponent,
    GroupCardComponent,
    ChipsPickerComponent,
    KeyFiguresComponent,
    AboutAndContactComponent,
    HeadlineOfListComponent,
    ListElementComponent,
    BackButtonComponent,
    WikiHeaderComponent
  ]
})
export class SharedModule { }
