import { Component } from '@angular/core';
import { AuthenticationService } from '../../api/services/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../api/models/login';
import { TokenService } from '../../api/services/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginRequest: Login = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private tokenService: TokenService,
  
  ) {}

  login() {
    this.errorMsg = [];
    this.service.login(this.loginRequest).subscribe({
      next: (response) => {
        if (response.token) {
          this.tokenService.setToken(response.token as string);
          this.router.navigateByUrl('/main/acceuil');
        } else {
          this.errorMsg.push('impossible de vous identifier');
        }
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
          this.showModal();
        } else {
          this.errorMsg.push(err.error.error);
          this.showModal();
        }
      },
    });
  }

  showModal() {
    const modal = document.getElementById('customModal');
    modal!.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('customModal');
    modal!.style.display = 'none';
  }
}
