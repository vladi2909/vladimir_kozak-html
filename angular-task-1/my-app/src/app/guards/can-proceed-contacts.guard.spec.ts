import { TestBed } from '@angular/core/testing';

import { CanProceedContactsGuard } from './can-proceed-contacts.guard';

describe('CanProceedContactsGuard', () => {
  let guard: CanProceedContactsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanProceedContactsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
