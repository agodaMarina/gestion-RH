import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { TokenService } from '../api/services/token.service';
import { Router } from '@angular/router';
import { LoadingService } from '../api/services/loading.service';

const routesWithoutToken = [
  '/auth/register',
  '/auth/login',
  '/auth/activate_account',
];

@Injectable({
  providedIn: 'root',
})
export class httpInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService, private tokenService: TokenService, private router: Router) {}

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
          case 403: // Forbidden (Accès refusé)
            this.router.navigate(['/auth/login']);
            break;
          case 404: // Not Found
            this.router.navigate(['/error/404']);
            break;
        }
        return throwError(() => new Error(error.message));
      })
    ).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
    