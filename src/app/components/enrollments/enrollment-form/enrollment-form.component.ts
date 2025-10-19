import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { EnrollmentCreate } from '../../../models/enrollment.model';
import { forkJoin, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private router = inject(Router);

  enrollmentForm: FormGroup;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchingStudents = false;
  searchingCourses = false;
  showStudentSuggestions = false;
  showCourseSuggestions = false;
  loading = false;
  loadingData = false;
  error = '';
  successMessage = '';
  private destroy$ = new Subject<void>();
  private studentSearchInitialized = false;
  private courseSearchInitialized = false;
  private selectedStudentLabel: string | null = null;
  private selectedCourseLabel: string | null = null;

  constructor() {
    this.enrollmentForm = this.fb.group({
      studentSearch: [''],
      student: ['', Validators.required],
      courseSearch: [''],
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
        this.filteredStudents = [...this.students];
        this.courses = response.courses.results;
        this.filteredCourses = [...this.courses];
        this.initializeStudentSearch();
        this.initializeCourseSearch();
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

  onStudentSearchFocus(): void {
    if (this.loadingData) {
      return;
    }
    this.filteredStudents = this.filteredStudents.length ? this.filteredStudents : [...this.students];
    this.showStudentSuggestions = true;
  }

  onStudentSearchBlur(): void {
    setTimeout(() => {
      this.showStudentSuggestions = false;
      this.enrollmentForm.get('student')?.markAsTouched();
    }, 150);
  }

  selectStudent(student: Student): void {
    const formatted = this.formatStudent(student);
    this.selectedStudentLabel = formatted;
    this.enrollmentForm.get('student')?.setValue(student.id);
    this.enrollmentForm.get('studentSearch')?.setValue(formatted, { emitEvent: false });
    this.showStudentSuggestions = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeStudentSearch(): void {
    if (this.studentSearchInitialized) {
      return;
    }
    const searchControl = this.enrollmentForm.get('studentSearch');
    if (!searchControl) {
      return;
    }

    this.studentSearchInitialized = true;

    searchControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap((value) => {
          const term = (value ?? '').toString();
          this.showStudentSuggestions = true;
          if (this.selectedStudentLabel && term === this.selectedStudentLabel) {
            return;
          }
          this.selectedStudentLabel = null;
          this.enrollmentForm.get('student')?.setValue('', { emitEvent: false });
        }),
        switchMap(value => this.fetchStudents((value ?? '').toString())),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: students => {
          this.filteredStudents = students;
          this.searchingStudents = false;
        },
        error: () => {
          this.filteredStudents = [];
          this.searchingStudents = false;
        }
      });
  }

  private fetchStudents(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      this.searchingStudents = false;
      return of([...this.students]);
    }
    this.searchingStudents = true;
    return this.studentService.getStudents(1, trimmed).pipe(
      map(response => response.results),
      catchError(() => of([]))
    );
  }

  private formatStudent(student: Student): string {
    return `${student.last_name}, ${student.first_name} (${student.id_number})`;
  }

  onCourseSearchFocus(): void {
    if (this.loadingData) {
      return;
    }
    this.filteredCourses = this.filteredCourses.length ? this.filteredCourses : [...this.courses];
    this.showCourseSuggestions = true;
  }

  onCourseSearchBlur(): void {
    setTimeout(() => {
      this.showCourseSuggestions = false;
      this.enrollmentForm.get('course')?.markAsTouched();
    }, 150);
  }

  selectCourse(course: Course): void {
    const formatted = this.formatCourse(course);
    this.selectedCourseLabel = formatted;
    this.enrollmentForm.get('course')?.setValue(course.id);
    this.enrollmentForm.get('courseSearch')?.setValue(formatted, { emitEvent: false });
    this.showCourseSuggestions = false;
  }

  private initializeCourseSearch(): void {
    if (this.courseSearchInitialized) {
      return;
    }
    const searchControl = this.enrollmentForm.get('courseSearch');
    if (!searchControl) {
      return;
    }

    this.courseSearchInitialized = true;

    searchControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap((value) => {
          const term = (value ?? '').toString();
          this.showCourseSuggestions = true;
          if (this.selectedCourseLabel && term === this.selectedCourseLabel) {
            return;
          }
          this.selectedCourseLabel = null;
          this.enrollmentForm.get('course')?.setValue('', { emitEvent: false });
        }),
        switchMap(value => this.fetchCourses((value ?? '').toString())),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: courses => {
          this.filteredCourses = courses;
          this.searchingCourses = false;
        },
        error: () => {
          this.filteredCourses = [];
          this.searchingCourses = false;
        }
      });
  }

  private fetchCourses(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      this.searchingCourses = false;
      return of([...this.courses]);
    }
    this.searchingCourses = true;
    return this.courseService.getCourses(1, trimmed).pipe(
      map(response => response.results),
      catchError(() => of([]))
    );
  }

  private formatCourse(course: Course): string {
    return `${course.code} - ${course.title}`;
  }
}
