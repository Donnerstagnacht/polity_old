import { TestBed } from '@angular/core/testing';

import { IsGroupAdminGuard } from './is-group-admin.guard';

describe('IsGroupAdminGuard', () => {
  let guard: IsGroupAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsGroupAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
