import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { profile_list_item } from 'src/app/groups/state/profile_list_item.model';
import { PaginationData, PaginationFrontendService } from 'src/app/utilities/storage/services/pagination-frontend.service';

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

  @Input() paginationDataFirstTab: PaginationData | undefined;
  @Input() paginationDataSecondTab: PaginationData | undefined;


  filterString: string = '';
  dataFirstTabDisplayed: profile_list_item[] = [];
  dataSecondTabDisplayed: profile_list_item[] = [];

  @Output() removeItemFromFirstTab: EventEmitter<{id: string, user_id: string, boolean?: boolean}> = new EventEmitter<{id: string, user_id: string, boolean?: boolean}>();
  @Output() removeItemFromSecontTab: EventEmitter<{id: string, user_id: string, boolean?: boolean}> = new EventEmitter<{id: string, user_id: string,  boolean?: boolean}>();

  @Output() acceptItemFromFirstTab: EventEmitter<{id: string, user_id: string}> = new EventEmitter<{id: string, user_id: string}>();
  @Output() acceptItemFromSecontTab: EventEmitter<string> = new EventEmitter<string>();

  // @Output() newFilterTerm: EventEmitter<string> = new EventEmitter<string>();


  constructor(private paginationService: PaginationFrontendService) { }

  ngOnInit(): void {
    console.log('component.firstdata')
    console.log(this.dataFirstTab)
    console.log('component.seconddata')
    console.log(this.dataSecondTab)
    console.log('paginationData')
    console.log(this.paginationDataFirstTab)

    if(this.paginationDataFirstTab) {
      this.paginationDataFirstTab.numberOfSearchResults = this.dataFirstTab.length;
      this.dataFirstTabDisplayed = this.dataFirstTab.slice(this.paginationDataFirstTab.from, this.paginationDataFirstTab.to);
    }
    if(this.paginationDataSecondTab) {
      this.paginationDataSecondTab.numberOfSearchResults = this.dataSecondTab.length;
      this.dataSecondTabDisplayed = this.dataSecondTab.slice(this.paginationDataSecondTab.from, this.paginationDataSecondTab.to);
    }
  }

  ngOnChanges(): void {
    if(this.paginationDataFirstTab) {
      this.paginationDataFirstTab.numberOfSearchResults = this.dataFirstTab.length;
      this.dataFirstTabDisplayed = this.dataFirstTab.slice(this.paginationDataFirstTab.from, this.paginationDataFirstTab.to);
    }
    if(this.paginationDataSecondTab) {
      this.paginationDataSecondTab.numberOfSearchResults = this.dataSecondTab.length;
      this.dataSecondTabDisplayed = this.dataSecondTab.slice(this.paginationDataSecondTab.from, this.paginationDataSecondTab.to);
    }
  }

  loadNewDataFirstTab(): void {
    if(this.paginationDataFirstTab) {
      console.log('paginationDataFirstTab')
      console.log(this.paginationDataFirstTab)
      this.paginationDataFirstTab = this.paginationService.scrollDownAndLoadAscending(this.paginationDataFirstTab);
      this.dataFirstTabDisplayed = this.dataFirstTab.slice(this.paginationDataFirstTab.from, this.paginationDataFirstTab.to);
    }
  }

  loadNewDataSecondTab(): void {
    if(this.paginationDataSecondTab) {
      console.log('paginationDataSedondTab')
      console.log(this.paginationDataSecondTab)
      this.paginationDataSecondTab = this.paginationService.scrollDownAndLoadAscending(this.paginationDataSecondTab);
      this.dataSecondTabDisplayed = this.dataSecondTab.slice(this.paginationDataSecondTab.from, this.paginationDataSecondTab.to);
    }
  }

  removeFromFirstDataTab(id: string, user_id: string, boolean?: boolean) {
    console.log('id')
    console.log(id);
    console.log('user_id')
    console.log(user_id)
    console.log('boolean')
    console.log(boolean)
    if(boolean) {
      this.removeItemFromFirstTab.emit({id, user_id, boolean});
    } else {
      this.removeItemFromFirstTab.emit({id, user_id});
    }
  }

  removeFromSecondDataTab(id: string, user_id: string, boolean?: boolean) {
    console.log('id')
    console.log(id);
    console.log('user_id')
    console.log(user_id)
    console.log('boolean')
    console.log(boolean)
    if(boolean) {
      this.removeItemFromSecontTab.emit({id, user_id, boolean});
    } else {
      this.removeItemFromSecontTab.emit({id, user_id});
    }
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
