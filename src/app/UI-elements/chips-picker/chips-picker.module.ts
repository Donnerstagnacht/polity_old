import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsPickerComponent } from './chips-picker.component';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    ChipsPickerComponent
  ],
  imports: [
    CommonModule,
    ChipModule
  ],
  exports: [
    ChipsPickerComponent
  ]
})
export class ChipsPickerModule { }
