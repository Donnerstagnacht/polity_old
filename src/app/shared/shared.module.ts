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

@NgModule({
  declarations: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AppRoutingModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule
  ],
  exports: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent,
    WrapperGridComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent
  ]
})
export class SharedModule { }
