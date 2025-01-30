import { Component } from '@angular/core';
import { AuthenticationService } from '../../api/services/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../api/models/login';
import { TokenService } from '../../api/services/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadingService } from '../../api/services/loading.service';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginRequest: Login = { email: '', password: '' };
  errorMsg: string[] = [];

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private tokenService: TokenService,
    private loadingService: LoadingService
  ) {}

  // login() {
  //   this.loadingService.setLoading(true);
  //   this.errorMsg = [];
  //   this.service
  //     .login(this.loginRequest)
  //     .pipe(finalize(() => this.loadingService.setLoading(false)))
  //     .subscribe({
  //       next: (response) => {
  //         if (response.token) {
  //           this.tokenService.setToken(response.token as string);
  //           this.router.navigateByUrl('/main/acceuil');
  //         } else {
  //           this.errorMsg.push('impossible de vous identifier');

  //         }
  //         console.log('ErrorMsg après echec:', this.errorMsg);
  //       },
  //       error: (err) => {
  //         // Vérification des erreurs de validation
  //         if (err.error.validationErrors) {
  //           this.errorMsg = err.error.validationErrors;
  //         }
  //         // Vérification de l'erreur business
  //         else if (err.error.businessErrorDescription) {
  //           this.errorMsg.push(err.error.businessErrorDescription);
  //         }
  //         // Fallback sur le message d'erreur général
  //         else if (err.error.error) {
  //           this.errorMsg.push(err.error.error);
  //         }
  //         // Si aucun message d'erreur n'est disponible
  //         else {
  //           this.errorMsg.push('Une erreur est survenue');
  //         }
  //         console.log('ErrorMsg après echec:', this.errorMsg);
  //       },
  //     }
  //   );
  // }

  login() {
    console.log('Début de la fonction login');
    this.loadingService.setLoading(true);
    this.errorMsg = [];

    this.service
      .login(this.loginRequest)
      .pipe(
        catchError((err) => {
             
          // Vérifions toutes les propriétés possibles
          if (err.error?.businessErrorDescription) {
            this.errorMsg.push(err.error.businessErrorDescription);
          } else if (err.error?.error) {
            this.errorMsg.push(err.error.error);
          } else if (err.status === 401) {
            this.errorMsg.push('Email et/ou mot de passe incorrect');
          } else {
            this.errorMsg.push('Une erreur est survenue');
          }
          throw err;
        }),
        finalize(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.tokenService.setToken(response.token as string);
            this.router.navigateByUrl('/main/acceuil');
          }
        },
        error: () => {
          // L'erreur a déjà été traitée dans le catchError
        },
      });
  }
}
