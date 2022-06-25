import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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

  searchTable: string = 'profiles'

  constructor(
    private searchService: SearchService,
    ) { }

  ngOnInit(): void {

  }

  onSearch(
    searchTerm: string,
  ): void {
    this.searchService.searchForResults(
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
    )
    .then((results) => {
      console.log(results.data[0]);
      console.log(this.searchTable)
      switch(this.searchTable) {
        case 'profiles': {
          this.profileResults = results.data;
          console.log(this.profileResults)
          break;
        }
        case 'profiles': {
          this.profileResults = results.data;
          break;
        }
        case 'groups': {
          this.groupsResults = results.data;
          break;
        }
        case 'groups': {
          this.groupsResults = results.data;
          break;
        }
      }
    })
    .catch((error) => console.log(error));
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
