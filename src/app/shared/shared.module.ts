import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarLeftComponent } from './menu-bar-left/menu-bar-left.component';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuBarBottomComponent } from './menu-bar-bottom/menu-bar-bottom.component';
import { WrapperFullCreenCenterComponent } from './wrapper-full-creen-center/wrapper-full-creen-center.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AppRoutingModule
  ],
  exports: [
    MenuBarLeftComponent,
    MenuBarBottomComponent,
    WrapperFullCreenCenterComponent
  ]
})
export class SharedModule { }
