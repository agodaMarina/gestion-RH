import { Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'jwtToken';

  constructor(private router:Router){}
  
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('[/auth/login]')
  }

  isTokenValid() {
    const token = this.getToken(); // Get the actual token from local storage
  if (!token) {
    return false;
  }
  
  const jwtHelper = new JwtHelperService();
  
  try {
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      this.removeToken(); // Clear token if it's expired
      return false;
    }
    return true;
  } catch (error) {
    // Handle invalid/malformed token here
    console.error('Token invalide:', error);
    this.removeToken(); // Remove invalid token
    return false;
  }
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }
  
  get userRoles(): string[] {
    const token = this.tokenKey;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.authorities;
    }
    return [];
  }
}
