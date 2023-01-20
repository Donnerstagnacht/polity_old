import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './/create-event.component';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ChipsPickerGenericModule } from 'src/app/UI-elements/chips-picker-generic/chips-picker-generic.module';



@NgModule({
  declarations: [
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    SidebarModule,
    TagModule,
    CarouselModule,
    InputTextareaModule,
    ButtonModule,
    ChipsPickerGenericModule
  ],
  exports: [
    CreateEventComponent
  ]
})
export class CreateEventModule { }
