import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { StudentDetailComponent } from './components/students/student-detail/student-detail.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseFormComponent } from './components/courses/course-form/course-form.component';
import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { EnrollmentListComponent } from './components/enrollments/enrollment-list/enrollment-list.component';
import { EnrollmentFormComponent } from './components/enrollments/enrollment-form/enrollment-form.component';
import { EnrollmentDetailComponent } from './components/enrollments/enrollment-detail/enrollment-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Ruta de inicio (redirige a login si no está autenticado)
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  
  // Rutas protegidas
  { 
    path: 'students', 
    component: StudentListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'students/new', 
    component: StudentFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'students/edit/:id', 
    component: StudentFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'students/:id', 
    component: StudentDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'courses', 
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'courses/new', 
    component: CourseFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'courses/edit/:id', 
    component: CourseFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'courses/:id', 
    component: CourseDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'enrollments', 
    component: EnrollmentListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'enrollments/new', 
    component: EnrollmentFormComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'enrollments/:id', 
    component: EnrollmentDetailComponent,
    canActivate: [AuthGuard]
  },
  
  // Redirección para rutas no encontradas
  { 
    path: '**', 
    redirectTo: ''
  }
];
