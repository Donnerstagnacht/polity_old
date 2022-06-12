import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showFilterOptions: boolean = true;
  results: any[] = [];

  localFilterOn: boolean = false;
  regionalFilterOn: boolean = false;
  federalFilterOn: boolean = false;

  topicsFilterOn: boolean = false;
  filteredTopics: string[] = [];
  dateRangeFilterOn: boolean = false;
  createDateRangeValues: number[] = [2000, 2020];

  statusOpenOn: boolean = false;
  statusClosedOn: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {

  }

  onSearch(
    searchTerm: string,
  ): void {
    this.searchService.searchForResults(
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
      this.results = results.data;
    } )
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


}
