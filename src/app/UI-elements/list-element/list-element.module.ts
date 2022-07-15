import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementComponent } from './list-element.component';
import { RouterModule } from '@angular/router';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ListElementComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    RouterModule,
    ToastModule
  ],
  exports: [
    ListElementComponent
  ]
})
export class ListElementModule { }
