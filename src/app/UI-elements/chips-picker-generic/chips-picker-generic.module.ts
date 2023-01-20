import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsPickerGenericComponent } from './chips-picker-generic.component';
import { ChipModule } from 'primeng/chip';



@NgModule({
  declarations: [
    ChipsPickerGenericComponent
  ],
  imports: [
    CommonModule,
    ChipModule
  ],
  exports: [
    ChipsPickerGenericComponent
  ]
})
export class ChipsPickerGenericModule { }
