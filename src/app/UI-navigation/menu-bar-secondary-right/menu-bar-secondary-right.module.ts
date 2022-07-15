import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarSecondaryRightComponent } from './menu-bar-secondary-right.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    MenuBarSecondaryRightComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    MenuModule
  ],
  exports: [
    MenuBarSecondaryRightComponent
  ]
})
export class MenuBarSecondaryRightModule { }
