import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;
  loading = false;
  error = '';

  constructor() {
    this.courseForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      title: ['', [Validators.required, Validators.maxLength(120)]],
      capacity: [30, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse();
    }
  }

  loadCourse() {
    this.loading = true;
    this.courseService.getCourse(this.courseId!).subscribe({
      next: (course: Course) => {
        this.courseForm.patchValue(course);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar curso';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const courseData: Course = this.courseForm.value;

    const request = this.isEditMode
      ? this.courseService.updateCourse(this.courseId!, courseData)
      : this.courseService.createCourse(courseData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al guardar curso';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

  get f() {
    return this.courseForm.controls;
  }
}
