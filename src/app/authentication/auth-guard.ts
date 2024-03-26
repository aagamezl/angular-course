import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

export const authGuard = async () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  const isLoggedIn = await authService.isLoggedIn()

  // ESTA LOGEADO
  if (isLoggedIn) {
    return true;
  }

  // Navigate to the login page with extras
  return router.createUrlTree(['/login']);
};
