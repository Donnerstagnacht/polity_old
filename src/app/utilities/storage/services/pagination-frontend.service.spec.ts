import { TestBed } from '@angular/core/testing';

import { PaginationFrontendService } from './pagination-frontend.service';

describe('PaginationFrontendService', () => {
  let service: PaginationFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
