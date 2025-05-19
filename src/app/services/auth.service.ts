import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(environment.backendHost + '/auth/register', userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(environment.backendHost + '/auth/login', credentials).pipe(
      tap((response: any) => {
        if (response['access-token']) {
          localStorage.setItem('token', response['access-token']);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
} 