import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackButtonModule { }
