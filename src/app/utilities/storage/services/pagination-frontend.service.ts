import { Injectable } from '@angular/core';

export type PaginationData = {
  from: number,
  to: number,
  canLoad: boolean,
  numberOfSearchResults: number,
  reloadDelay: number,
  sizeOfNewLoad: number
}

@Injectable({
  providedIn: 'root'
})
export class PaginationFrontendService {

  constructor() { }

  scrollDownAndLoadAscending(paginationData: PaginationData): PaginationData {
    if(paginationData.canLoad) {
      console.log('can load!!');
      if(paginationData.to + paginationData.sizeOfNewLoad < paginationData.numberOfSearchResults) {
        paginationData.to = paginationData.to + paginationData.sizeOfNewLoad;
      } else {
        paginationData.to = paginationData.numberOfSearchResults;
      }
      paginationData.canLoad = false;
      console.log('from')
      console.log(paginationData.from)
      console.log('to')
      console.log(paginationData.to)
      setTimeout(() => {
        paginationData.canLoad = true;
      }, paginationData.reloadDelay);
    }
    return paginationData;
  }

  scrollUpAndLoadDescending(paginationData: PaginationData): PaginationData {
    // paginationData.checkView = false;
    if(paginationData.canLoad) {
      console.log('can load!!');
      if(paginationData.from - paginationData.sizeOfNewLoad > 0) {
        paginationData.from = paginationData.from - paginationData.sizeOfNewLoad;
      } else {
        paginationData.from = 0;
      }
      paginationData.canLoad = false;
      console.log(paginationData.from)
      console.log('from')
      console.log(paginationData.to)
      setTimeout(() => {
        paginationData.canLoad = true;
      }, paginationData.reloadDelay);
    }
    return paginationData;
  }
}
