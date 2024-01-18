import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { UserLoggedGuard } from './user-logged.guard';

describe('UserLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => UserLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
