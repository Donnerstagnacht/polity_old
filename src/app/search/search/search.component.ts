import { Component, OnInit, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaginationData, PaginationFrontendService } from 'src/app/utilities/storage/services/pagination-frontend.service';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
  showFilterOptions: boolean = true;
  profileResults: any[] = [];
  groupsResults: any[] = [];

  localFilterOn: boolean = false;
  regionalFilterOn: boolean = false;
  federalFilterOn: boolean = false;

  topicsFilterOn: boolean = false;
  filteredTopics: string[] = [];
  dateRangeFilterOn: boolean = false;
  createDateRangeValues: number[] = [2000, 2020];

  statusOpenOn: boolean = false;
  statusClosedOn: boolean = false;

  searchTable: string = 'profiles';

  loadingInitial: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string | undefined;
  lastSearchTerm: string = '';

  visibleItems = 10;
  @HostListener("window:resize", []) updateDays() {
    if (window.innerWidth >= 1440) {
      this.visibleItems = 10; // lg
    } else if (window.innerWidth >= 1024) {
      this.visibleItems = 8;//md
    } else if (window.innerWidth  >= 768) {
      this.visibleItems = 5;//sm
    } else if (window.innerWidth < 768) {
      this.visibleItems = 3;//xs
    }
  }
  paginationData: PaginationData = {
    from: 0,
    to: this.visibleItems,
    canLoad: true,
    reloadDelay: 2000,
    sizeOfNewLoad: 10,
    numberOfSearchResults: 0
  }

  constructor(
    private searchService: SearchService,
    private messageService: MessageService,
    private paginationService: PaginationFrontendService
    ) { }

  ngOnInit(): void {

  }

  async onSearch(
    searchTerm: string,
  ): Promise<void> {
    try {
      this.loadingInitial = true;
      this.lastSearchTerm = searchTerm;
      this.paginationData.to = 4;
      this.error = false;
      const searchResults: {data: any, error: any } = await this.searchService.searchForResults(
        this.searchTable,
        searchTerm,
        this.localFilterOn,
        this.regionalFilterOn,
        this.federalFilterOn,

        this.topicsFilterOn,
        this.filteredTopics,
        this.dateRangeFilterOn,
        this.createDateRangeValues,

        this.statusOpenOn,
        this.statusClosedOn
      );
      this.paginationData.numberOfSearchResults = searchResults.data.length;
      switch(this.searchTable) {
        case 'profiles': {
          this.profileResults = searchResults.data;
          console.log(this.profileResults)
          break;
        }
        case 'profiles': {
          this.profileResults = searchResults.data;
          break;
        }
        case 'groups': {
          this.groupsResults = searchResults.data;
          break;
        }
        case 'groups': {
          this.groupsResults = searchResults.data;
          break;
        }
      }
    } catch(error: any) {
      this.error = true;
      this.errorMessage = error.message
      this.messageService.add({severity:'error', summary: error.message});
    } finally {
      this.loadingInitial = false;
    }
  }

  loadNewDataFromService(): void {
    this.paginationData = this.paginationService.scrollDownAndLoadAscending(this.paginationData);
  }

  setLocalFilter(): void {
    this.localFilterOn = !this.localFilterOn;
  }

  setRegionalFilter(): void {
    this.regionalFilterOn = !this.regionalFilterOn;
  }

  setFederalFilter(): void {
    this.federalFilterOn = !this.federalFilterOn;
  }

  test(event: any): void {
    event.index
    console.log(event.index)

    switch(event.index) {
      case 0: {
        this.searchTable = 'profiles'
        break;
      }
      case 1: {
        this.searchTable = 'profiles'
        break;
      }
      case 2: {
        this.searchTable = 'groups'
        break;
      }
      case 3: {
        this.searchTable = 'groups'
        break;
      }
    }
  }


}
