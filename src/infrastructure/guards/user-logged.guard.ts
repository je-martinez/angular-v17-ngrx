import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';
import { tap } from 'rxjs/operators';

export const UserLoggedGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  return authFacade.user$.pipe(
    tap({
      next: (user) => {
        if (!user) {
          router.navigate(['auth/sign-up']);
        }
      }
    }),
    map((user) => !!user)
  );
};
