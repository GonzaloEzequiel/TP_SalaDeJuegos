import { inject } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = async (route, state) => {

  const auth = inject(AuthService);  
  const router = inject(Router);
  const isLogged = await auth.isLoggedIn();

  if (isLogged) 
    return true;

  await router.navigate(['/usuarios/login']);
  return false;

};
