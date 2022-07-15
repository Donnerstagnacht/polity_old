import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AboutAndContactComponent } from './about-and-contact.component';


@NgModule({
  declarations: [
    AboutAndContactComponent
  ],
  imports: [
    CommonModule,
    TabViewModule
  ],
  exports: [
    AboutAndContactComponent
  ]
})
export class AboutAndContactModule { }
