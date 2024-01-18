import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NoUserLoggedGuard } from './no-user-logged.guard';

describe('NoUserLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => NoUserLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
