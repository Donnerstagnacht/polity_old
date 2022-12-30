import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsOverlayComponent } from './actions-overlay.component';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { CreateGroupModule } from '../create-group/create-group.module';
import { CreateEventModule } from '../create-event/create-event.module';



@NgModule({
  declarations: [
    ActionsOverlayComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    DividerModule,
    CreateGroupModule,
    CreateEventModule
  ], exports: [
    ActionsOverlayComponent
  ]
})
export class ActionsOverlayModule { }
