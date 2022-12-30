import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './/create-event.component';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { ChipsPickerModule } from 'src/app/UI-elements/chips-picker/chips-picker.module';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';



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
    ChipsPickerModule,
    InputTextareaModule,
    ButtonModule
  ],
  exports: [
    CreateEventComponent
  ]
})
export class CreateEventModule { }
