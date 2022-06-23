import { TestBed } from '@angular/core/testing';

import { FollowingGroupsService } from './following-groups.service';

describe('FollowingGroupsService', () => {
  let service: FollowingGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
