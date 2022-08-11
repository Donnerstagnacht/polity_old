import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';

@Component({
  selector: 'app-tab-view-table-lists',
  templateUrl: './tab-view-table-lists.component.html',
  styleUrls: ['./tab-view-table-lists.component.scss']
})
export class TabViewTableListsComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() dataFirstTab: profile_list_item[] = [];
  @Input() dataSecondTab: profile_list_item[] = [];
  @Input() titleFirstTab: string = '';
  @Input() titleSecondTab: string = '';
  @Input() noDataFirstTab: string = '';
  @Input() noDataSecondTab: string = '';
  @Input() secondTabNeeded: boolean = true;
  @Input() acceptButtonNeededFirstTab: boolean = false;
  @Input() acceptButtonNeededSecondTab: boolean = false;


  filterString: string = '';

  @Output() removeItemFromFirstTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeItemFromSecontTab: EventEmitter<{id: string, user_id: string}> = new EventEmitter<{id: string, user_id: string}>();

  @Output() acceptItemFromFirstTab: EventEmitter<{id: string, user_id: string}> = new EventEmitter<{id: string, user_id: string}>();
  @Output() acceptItemFromSecontTab: EventEmitter<string> = new EventEmitter<string>();

  // @Output() newFilterTerm: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  removeFromFirstDataTab(id: string) {
    this.removeItemFromFirstTab.emit(id);
  }

  removeFromSecondDataTab(id: string, user_id: string) {
    this.removeItemFromSecontTab.emit({id, user_id});
  }

  acceptFromFirstTab(id: string, user_id: string) {
    this.acceptItemFromFirstTab.emit({id, user_id});
  }

  acceptFromSecondTab(id: string) {
    this.acceptItemFromSecontTab.emit(id);
  }

/*   newFilter(filterTerm: string) {
    this.newFilterTerm.emit(filterTerm);
  } */

}
