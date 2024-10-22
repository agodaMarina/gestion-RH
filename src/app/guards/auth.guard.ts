import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../api/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isTokenValid()) {
    return true; // Allow access
  } else {
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login
    return false; // Block access
  }
};
