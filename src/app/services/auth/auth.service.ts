import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, User, AuthResponse, AuthUserPayload } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBase || 'http://localhost:8000'}/auth`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Intenta cargar el usuario desde localStorage al iniciar
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private mapUser(payload: AuthUserPayload): User {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email ?? null,
      firstName: payload.first_name ?? null,
      lastName: payload.last_name ?? null,
      groups: payload.groups ?? []
    };
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, credentials).pipe(
      tap(response => {
        this.persistSession(response);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    const payload = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      invite_code: userData.registrationCode
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, payload).pipe(
      tap(response => {
        // Opcional: iniciar sesión automáticamente después del registro
        this.persistSession(response);
      })
    );
  }

  logout(): void {
    // Eliminar datos de autenticación
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private persistSession(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.access);
    localStorage.setItem('refreshToken', response.refresh);
    const user = this.mapUser(response.user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
