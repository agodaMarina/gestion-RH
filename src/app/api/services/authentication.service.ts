import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';
import { ChangePasswordRequest } from '../models/change-password-request';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { UpdateProfilRequest } from '../models/update-profil-request';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: String="http://localhost:8000/auth";

  url:String="http://localhost:8000/utilisateur";


  constructor(private http: HttpClient,private tokenService:TokenService) { } 

  register(registrationData: Register): Observable<any> {
    const url = `${this.apiUrl}/register`; 
    return this.http.post(url, registrationData);
  }

  login(credentials: Login): Observable<AuthenticationResponse> {
    const url = `${this.apiUrl}/login`; 
    return this.http.post<AuthenticationResponse>(url, credentials);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) :Observable<any>{
    const url = `${this.url}/change-password`;
    return this.http.put(url, changePasswordRequest);
  }
  
  activateAccount(token: string): Observable<any> { 
    const url = `${this.apiUrl}/activate_account?token=${token}`;
    return this.http.get(url);  
  }

  getProfile() :Observable<any>{
    const url = `${this.url}/profile`;
    return this.http.get(url);
  }

  updateProfile(updateProfilRequest: UpdateProfilRequest):Observable<any>{
    const url = `${this.url}/updateProfile`;
    return this.http.put(url, updateProfilRequest);
  }

  logout()  {
    const url = `${this.apiUrl}/logout`;
    return this.http.get(url);
    
  } 

}
