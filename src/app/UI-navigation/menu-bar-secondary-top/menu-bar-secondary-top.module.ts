import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarSecondaryTopComponent } from './menu-bar-secondary-top.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { SidebarModule } from 'primeng/sidebar';



@NgModule({
  declarations: [
    MenuBarSecondaryTopComponent
  ],
  imports: [
    CommonModule,
    MegaMenuModule,
    SidebarModule
  ], exports: [
    MenuBarSecondaryTopComponent
  ]
})
export class MenuBarSecondaryTopModule { }
