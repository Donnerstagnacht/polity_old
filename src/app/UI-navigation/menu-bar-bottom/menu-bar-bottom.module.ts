import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarBottomComponent } from './menu-bar-bottom.component';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ActionsOverlayModule } from '../../UI-dialogs/actions-overlay/actions-overlay.module';


@NgModule({
  declarations: [
    MenuBarBottomComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    MegaMenuModule,
    ActionsOverlayModule
  ],
  exports: [
    MenuBarBottomComponent
  ]
})
export class MenuBarBottomModule { }
