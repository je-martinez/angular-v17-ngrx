import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';

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
