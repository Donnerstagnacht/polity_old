import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  constructor(
    private searchService: SearchService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {

  }

  async onSearch(
    searchTerm: string,
  ): Promise<void> {
    try {
      this.loadingInitial = true;
      this.lastSearchTerm = searchTerm;
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
