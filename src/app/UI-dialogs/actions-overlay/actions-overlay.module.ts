import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsOverlayComponent } from './actions-overlay.component';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { CreateGroupModule } from '../create-group/create-group.module';



@NgModule({
  declarations: [
    ActionsOverlayComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    DividerModule,
    CreateGroupModule
  ], exports: [
    ActionsOverlayComponent
  ]
})
export class ActionsOverlayModule { }
