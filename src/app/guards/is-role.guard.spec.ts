import { TestBed } from '@angular/core/testing';

import { IsRoleGuard } from './is-role.guard';

describe('IsRoleGuard', () => {
  let guard: IsRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
