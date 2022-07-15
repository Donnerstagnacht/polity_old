import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { NewsListItemComponent } from './news-list-item.component';



@NgModule({
  declarations: [
    NewsListItemComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    TagModule
  ],
  exports: [
    NewsListItemComponent
  ]
})
export class NewsListItemModule { }
