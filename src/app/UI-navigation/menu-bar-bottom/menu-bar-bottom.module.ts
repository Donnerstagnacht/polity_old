import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarBottomComponent } from './menu-bar-bottom.component';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ActionsOverlayModule } from '../../UI-dialogs/actions-overlay/actions-overlay.module';
import {BadgeModule} from 'primeng/badge';
import { SwitchThemeModule } from 'src/app/UI-structure/switch-theme/switch-theme.module';

@NgModule({
  declarations: [
    MenuBarBottomComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    MegaMenuModule,
    ActionsOverlayModule,
    BadgeModule,
    SwitchThemeModule
  ],
  exports: [
    MenuBarBottomComponent
  ]
})
export class MenuBarBottomModule { }
