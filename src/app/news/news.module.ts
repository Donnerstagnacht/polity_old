import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { ChipModule } from 'primeng/chip';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { MenuBarSecondaryTopModule } from '../UI-navigation/menu-bar-secondary-top/menu-bar-secondary-top.module';
import { MenuBarSecondaryRightModule } from '../UI-navigation/menu-bar-secondary-right/menu-bar-secondary-right.module';
import { NewsListItemModule } from '../UI-elements/news-list-item/news-list-item.module';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    ChipModule,
    WrapperGridModule,
    MenuBarSecondaryTopModule,
    MenuBarSecondaryRightModule,
    MenuBarSecondaryTopModule,
    NewsListItemModule,

  ],
  exports: [
    NewsComponent
  ]
})
export class NewsModule { }
