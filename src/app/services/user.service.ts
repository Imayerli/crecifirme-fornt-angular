import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuarios';
  private tokenKey = 'auth-token';
  private user: User = {} as User;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  login(credentials: { email: string, clave: string }) {
    const sanitizedCredentials = {
      email: credentials.email.trim(),
      clave: credentials.clave.trim()
    };

    return this.http.post(`${this.apiUrl}/login`, sanitizedCredentials).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    ).subscribe((response: any) => {
      if (response && response.token && response.user) {
        const token = response.token;
        this.user = response.user;
        if (!this.jwtHelper.isTokenExpired(token)) {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem('user', JSON.stringify(this.user));
          } else {
            console.error('localStorage is not available');
          }
          this.router.navigate(['/home']);
        } else {
          console.error('Token is expired');
        }
      } else {
        console.error('Invalid response structure');
      }
    });
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(this.tokenKey);
      return token !== null && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  getUser(): User  {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
    return this.user;
  }

  updateUser( user: any): Observable<any> {
    return this.http.put(`/api/usuarios/${user.id}`, user);
  }

}
