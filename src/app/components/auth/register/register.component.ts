import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterRequest } from '../../../interfaces/user.interface';

// Validador personalizado para verificar que las contraseñas coincidan
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      registrationCode: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    // Redirigir a la página principal si ya está autenticado
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Obtener la URL de retorno de los parámetros de ruta o usar la raíz por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Getter para acceder a los controles del formulario
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    const registerData: RegisterRequest = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      registrationCode: this.f['registrationCode'].value
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        // Redirigir a la URL de retorno o a la página principal
        this.router.navigateByUrl(this.returnUrl);
      },
      error: error => {
        this.error = 'Error al registrar el usuario. Por favor, inténtalo de nuevo.';
        if (error.error && error.error.message) {
          this.error = error.error.message;
        }
        this.loading = false;
      }
    });
  }
}
