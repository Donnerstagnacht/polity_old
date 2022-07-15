import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCardComponent } from './group-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GroupCardComponent
  ]
})
export class GroupCardModule { }
