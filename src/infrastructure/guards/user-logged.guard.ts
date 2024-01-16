import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { map } from 'rxjs';
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
