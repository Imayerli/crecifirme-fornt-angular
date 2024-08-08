import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuarios';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  login(credentials: { email: string, clave: string }) {
    // Sanitizar entradas
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
      // Validar la estructura de la respuesta
      if (response && response.token && response.user) {
        const token = response.token;
        // Validar el token JWT
        if (!this.jwtHelper.isTokenExpired(token)) {
          localStorage.setItem(this.tokenKey, token);
          this.router.navigate(['/']);
        } else {
          console.error('Token is expired');
        }
      } else {
        console.error('Invalid response structure');
      }
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
