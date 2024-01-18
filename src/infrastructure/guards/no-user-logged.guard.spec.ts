import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { NoUserLoggedGuard } from './no-user-logged.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { generateMockAuthFacade } from '@mocks/facades/auth-facade.mock';
import { Observable, take } from 'rxjs';
import { mockRouter } from '@mocks/core/router.mock';

describe('NoUserLoggedGuard', () => {
  const setup = async (emptyUser = false) => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NoUserLoggedGuard,
        {
          provide: AuthFacade,
          useValue: generateMockAuthFacade(emptyUser)
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
    return TestBed.runInInjectionContext(() =>
      NoUserLoggedGuard(
        {} as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot
      )
    );
  };

  it('should be created', async () => {
    const guard = await setup();
    expect(guard).toBeTruthy();
  });

  it('should return false if user is logged', async () => {
    const guard = await setup();

    (guard as Observable<boolean>).pipe(take(1)).subscribe((result) => {
      expect(result).toBeFalse();
    });
  });

  it('should return true if user is not logged', async () => {
    const guard = await setup(true);

    (guard as Observable<boolean>).pipe(take(1)).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });
});
