import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { map, tap } from 'rxjs';

export const NoUserLoggedGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  return authFacade.user$.pipe(
    tap({
      next: (user) => {
        if (user) {
          router.navigate(['home/content-wall']);
        }
      }
    }),
    map((user) => !user)
  );
};
