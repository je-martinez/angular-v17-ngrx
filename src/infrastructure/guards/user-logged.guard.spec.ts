import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { generateMockAuthFacade } from '@mocks/facades/auth-facade.mock';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { Observable, take } from 'rxjs';
import { UserLoggedGuard } from './user-logged.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('UserLoggedGuard', () => {
  const setup = async (facadeWithEmptyUser = false) => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserLoggedGuard,
        {
          provide: AuthFacade,
          useValue: generateMockAuthFacade(facadeWithEmptyUser)
        }
      ]
    });
    return TestBed.runInInjectionContext(() =>
      UserLoggedGuard(
        {} as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot
      )
    );
  };

  beforeEach(async () => {});

  it('should be created', async () => {
    const guard = await setup();
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged', async () => {
    const guard = await setup();

    (guard as Observable<boolean>).pipe(take(1)).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });

  it('should return false if user is not logged', async () => {
    const guard = await setup(true);

    (guard as Observable<boolean>).pipe(take(1)).subscribe((result) => {
      expect(result).toBeFalse();
    });
  });
});
