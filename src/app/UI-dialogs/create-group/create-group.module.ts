import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ChipsPickerModule } from 'src/app/UI-elements/chips-picker/chips-picker.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    TagModule,
    AvatarModule,
    SidebarModule,
    FormsModule,
    ChipsPickerModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  exports: [
    CreateGroupComponent
  ]
})
export class CreateGroupModule { }
