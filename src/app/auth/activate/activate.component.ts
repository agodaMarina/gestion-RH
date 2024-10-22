import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipUntil } from 'rxjs/internal/operators/skipUntil';
import { AuthenticationService } from '../../api/services/authentication.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css',
})
export class ActivateComponent implements OnInit {
  submitted: any;
  isOkay: any;
  message: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  confirm(token:string) {
    this.authService.activateAccount(token).subscribe({
      next: () => {
        this.message =
          'Votre compte a été bien activé.\nMaintenant vous pouvez vous connecter';
        this.submitted = true;
      },
      error: () => {
        this.message = 'le Token a expiré ou est invalide. Veuillez réessayer';
        this.submitted = true;
        this.isOkay = false;
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  onCodeCompleted(token: string) {
    this.confirm(token);
  }

  protected readonly skipUntil = skipUntil;
}
