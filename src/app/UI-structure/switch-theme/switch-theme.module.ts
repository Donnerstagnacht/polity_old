import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch'
import { SwitchThemeComponent } from './switch-theme.component';


@NgModule({
  declarations: [
    SwitchThemeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SwitchThemeComponent
  ]
})
export class SwitchThemeModule { }
