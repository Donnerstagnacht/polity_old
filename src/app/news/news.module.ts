import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { UINavigationModule } from '../UI-navigation/ui-navigation.module';
import { UIStructureModule } from '../UI-structure/ui-structure.module';
import { UIElementsModule } from '../UI-elements/ui-elements.module';
import { ChipModule } from 'primeng/chip';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    UINavigationModule,
    UIStructureModule,
    UIElementsModule,
    ChipModule
  ],
  exports: [
    NewsComponent
  ]
})
export class NewsModule { }
