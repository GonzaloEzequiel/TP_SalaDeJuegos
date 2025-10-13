import { inject } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth';
import { CanMatchFn, Router } from '@angular/router';

export const logoutGuard: CanMatchFn = async (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const isLogged  = await auth.isLoggedIn();

  if (!isLogged ) 
    return true;

  await router.navigate(['/home']);
  return false;
};

