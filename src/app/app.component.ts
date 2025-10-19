import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { User } from './interfaces/user.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PSIS - Sistema de Matrículas';
  currentUser: User | null = null;
  isAuthenticated = false;
  showNavbar = true;
  private authSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el estado de autenticación
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
      this.updateNavbarVisibility(this.router.url);
    });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbarVisibility(event.urlAfterRedirects);
      });

    this.updateNavbarVisibility(this.router.url);
  }

  ngOnDestroy(): void {
    // Asegurarse de cancelar la suscripción para evitar fugas de memoria
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  private updateNavbarVisibility(url: string): void {
    const normalizedUrl = url.split('?')[0];
    const authRoutes = ['/login', '/register'];
    this.showNavbar = !authRoutes.some(route => normalizedUrl.startsWith(route));
  }
}
