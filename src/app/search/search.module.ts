import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import { SearchRoutingModule } from './search-routing.module';
import { WrapperGridModule } from '../UI-structure/wrapper-grid/wrapper-grid.module';
import { MenuBarSecondaryRightModule } from '../UI-navigation/menu-bar-secondary-right/menu-bar-secondary-right.module';
import { MenuBarSecondaryTopModule } from '../UI-navigation/menu-bar-secondary-top/menu-bar-secondary-top.module';
import { ProfileCardModule } from '../UI-elements/profile-card/profile-card.module';
import { GroupCardModule } from '../UI-elements/group-card/group-card.module';
import { LoadingSpinnerModule } from '../UI-elements/loading-spinner/loading-spinner.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    ChipModule,
    SliderModule,
    CheckboxModule,
    PanelModule,
    ChipsModule,
    SearchRoutingModule,
    WrapperGridModule,
    MenuBarSecondaryRightModule,
    MenuBarSecondaryTopModule,
    ProfileCardModule,
    GroupCardModule,
    LoadingSpinnerModule,
    InfiniteScrollModule
  ]
})
export class SearchModule { }
