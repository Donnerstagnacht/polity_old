import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarBottomComponent } from './menu-bar-bottom/menu-bar-bottom.component';
import { MenuBarLeftComponent } from './menu-bar-left/menu-bar-left.component';
import { MenuBarSecondaryRightComponent } from './menu-bar-secondary-right/menu-bar-secondary-right.component';
import { MenuBarSecondaryTopComponent } from './menu-bar-secondary-top/menu-bar-secondary-top.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { DialogsModule } from '../UI-dialogs/dialogs.module';



@NgModule({
  declarations: [
    MenuBarBottomComponent,
    MenuBarLeftComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    MegaMenuModule,
    SidebarModule,
    DialogsModule
  ],
  exports: [
    MenuBarBottomComponent,
    MenuBarLeftComponent,
    MenuBarSecondaryRightComponent,
    MenuBarSecondaryTopComponent
  ]
})
export class UINavigationModule { }
