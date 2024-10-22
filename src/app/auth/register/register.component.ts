import { Component } from '@angular/core';
import { Register } from '../../api/models/register';
import { AuthenticationService } from '../../api/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerRequest: Register = { username: '', email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(private service: AuthenticationService, private router: Router) {}

  register() {
    this.service.register(this.registerRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/auth/activate');
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        }else{
          this.errorMsg.push(err.error.error);
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
