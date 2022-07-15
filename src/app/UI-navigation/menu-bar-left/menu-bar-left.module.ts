import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarLeftComponent } from './menu-bar-left.component';
import { MenuModule } from 'primeng/menu'
import { SwitchThemeModule } from '../../UI-structure/switch-theme/switch-theme.module';
import { SidebarModule } from 'primeng/sidebar';
import { ActionsOverlayModule } from '../../UI-dialogs/actions-overlay/actions-overlay.module';

@NgModule({
  declarations: [
    MenuBarLeftComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    SwitchThemeModule,
    SidebarModule,
    ActionsOverlayModule
  ],
  exports: [
    MenuBarLeftComponent
  ]
})
export class MenuBarLeftModule { }
