import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  public searchForResults(searchTerm: string): void {
    console.log(searchTerm);
  }
}
