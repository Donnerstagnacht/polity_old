import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-view-table-lists',
  templateUrl: './tab-view-table-lists.component.html',
  styleUrls: ['./tab-view-table-lists.component.scss']
})
export class TabViewTableListsComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() dataFirstTab: any[] = [];
  @Input() dataSecondTab: any[] = [];
  filterString: string = '';

  @Output() removeItemFromFirstTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeItemFromSecontTab: EventEmitter<string> = new EventEmitter<string>();
  // @Output() newFilterTerm: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  removeFromFirstDataTab(id: string) {
    this.removeItemFromFirstTab.emit(id);
  }

  removeFromSecondDataTab(id: string) {
    this.removeItemFromSecontTab.emit(id);
  }

/*   newFilter(filterTerm: string) {
    this.newFilterTerm.emit(filterTerm);
  } */

}
