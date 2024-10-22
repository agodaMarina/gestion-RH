import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../api/services/token.service';
import { Router } from '@angular/router';

const routesWithoutToken = [
  '/auth/register',
  '/auth/login',
  '/auth/activate_account',
];

@Injectable({
  providedIn: 'root',
})
export class httpInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    const url = request.url;

    if (token && !routesWithoutToken.some((route) => url.includes(route))) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400: // Bad Request
            this.router.navigate(['/error/400']);
            break;
          case 401: // Unauthorized (Non authentifié)
            this.router.navigate(['/error/401']);
            break;
          case 403: // Forbidden (Accès refusé)
            this.router.navigate(['/error/403']);
            break;
          case 404: // Not Found
            this.router.navigate(['/error/404']);
            break;
          case 500: // Internal Server Error
            this.router.navigate(['/error/500']);
            break;
          default:
            this.router.navigate(['/error/unexpected']); // Pour toute autre erreur
            break;
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
    