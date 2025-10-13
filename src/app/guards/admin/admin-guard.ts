import { inject } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = async (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = await auth.isLoggedIn();
  const isAdmin = await auth.isAdmin();

  if(isLoggedIn && isAdmin) {
    return true;
  }

  await router.navigate(['/']);
  return false;
};
