import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperFullCreenCenterComponent } from './wrapper-full-creen-center/wrapper-full-creen-center.component';
import { WrapperGridComponent } from './wrapper-grid/wrapper-grid.component';



@NgModule({
  declarations: [
    WrapperFullCreenCenterComponent,
    WrapperGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WrapperFullCreenCenterComponent,
    WrapperGridComponent
  ]
})
export class UIStructureModule { }
