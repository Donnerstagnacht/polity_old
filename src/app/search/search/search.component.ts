import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showFilterOptions: boolean = true;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  onSearch(searchTerm: string): void {
    this.searchService.searchForResults(searchTerm);
  }

}
