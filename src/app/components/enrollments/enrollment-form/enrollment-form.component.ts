import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { EnrollmentCreate } from '../../../models/enrollment.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private router = inject(Router);

  enrollmentForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];
  loading = false;
  loadingData = false;
  error = '';
  successMessage = '';

  constructor() {
    this.enrollmentForm = this.fb.group({
      student: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadingData = true;
    
    forkJoin({
      students: this.studentService.getStudents(1, ''),
      courses: this.courseService.getCourses(1, '')
    }).subscribe({
      next: (response) => {
        this.students = response.students.results;
        this.courses = response.courses.results;
        this.loadingData = false;
      },
      error: (err) => {
        this.error = 'Error al cargar datos';
        this.loadingData = false;
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';
    
    const enrollmentData: EnrollmentCreate = {
      student: Number(this.enrollmentForm.value.student),
      course: Number(this.enrollmentForm.value.course)
    };

    this.enrollmentService.createEnrollment(enrollmentData).subscribe({
      next: () => {
        this.successMessage = '¡Matriculación creada exitosamente!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/enrollments']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error:', err);
        if (err.error?.detail) {
          this.error = err.error.detail;
        } else if (err.status === 400) {
          this.error = 'El alumno ya está inscrito en este curso';
        } else {
          this.error = 'Error al crear matriculación';
        }
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/enrollments']);
  }

  get f() {
    return this.enrollmentForm.controls;
  }
}
