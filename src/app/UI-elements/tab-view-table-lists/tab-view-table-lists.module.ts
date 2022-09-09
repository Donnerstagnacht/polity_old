import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewTableListsComponent } from './tab-view-table-lists.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    TabViewTableListsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    AvatarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InfiniteScrollModule
  ],
  exports: [
    TabViewTableListsComponent
  ]
})
export class TabViewTableListsModule { }
