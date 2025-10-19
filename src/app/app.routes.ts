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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'enrollments', component: EnrollmentListComponent },
  { path: 'enrollments/new', component: EnrollmentFormComponent },
  { path: 'enrollments/:id', component: EnrollmentDetailComponent },
  { path: '**', redirectTo: '' }
];
