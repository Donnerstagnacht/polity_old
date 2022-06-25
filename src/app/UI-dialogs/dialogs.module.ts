import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsOverlayComponent } from './actions-overlay/actions-overlay.component';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { UIElementsModule } from '../UI-elements/ui-elements.module';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ActionsOverlayComponent,
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    SidebarModule,

    CarouselModule,
    FormsModule,
    UIElementsModule,
    TagModule,
    AvatarModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    ActionsOverlayComponent,
    CreateGroupComponent
  ]
})
export class DialogsModule { }
