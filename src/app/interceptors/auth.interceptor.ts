import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  
  // Obtener el token del localStorage
  const token = localStorage.getItem('accessToken');
  
  // Clonar la solicitud y agregar el token si existe
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Manejar la respuesta
  const handle = next(request);
  
  return handle.pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejar errores 401 (No autorizado)
      if (error.status === 401) {
        // Limpiar el estado de autenticación
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        
        // Redirigir al login con la URL actual como parámetro
        router.navigate(['/login'], { 
          queryParams: { 
            returnUrl: router.routerState.snapshot.url 
          } 
        });
      }
      
      return throwError(() => error);
    })
  );
}
