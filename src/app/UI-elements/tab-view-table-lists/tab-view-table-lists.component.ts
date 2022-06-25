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
  @Input() titleFirstTab: string = '';
  @Input() titleSecondTab: string = '';
  @Input() noDataFirstTab: string = '';
  @Input() noDataSecondTab: string = '';
  @Input() secondTabNeeded: boolean = true;
  @Input() acceptButtonNeededFirstTab: boolean = false;
  @Input() acceptButtonNeededSecondTab: boolean = false;


  filterString: string = '';

  @Output() removeItemFromFirstTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeItemFromSecontTab: EventEmitter<string> = new EventEmitter<string>();

  @Output() acceptItemFromFirstTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() acceptItemFromSecontTab: EventEmitter<string> = new EventEmitter<string>();

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

  acceptFromFirstTab(id: string) {
    this.acceptItemFromFirstTab.emit(id);
  }

  acceptFromSecondTab(id: string) {
    this.acceptItemFromSecontTab.emit(id);
  }

/*   newFilter(filterTerm: string) {
    this.newFilterTerm.emit(filterTerm);
  } */

}
