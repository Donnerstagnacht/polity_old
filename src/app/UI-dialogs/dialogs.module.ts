import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsOverlayComponent } from './actions-overlay/actions-overlay.component';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';



@NgModule({
  declarations: [
    ActionsOverlayComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    SidebarModule
  ],
  exports: [
    ActionsOverlayComponent
  ]
})
export class DialogsModule { }
