import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentForm: FormGroup;
  isEditMode = false;
  studentId: number | null = null;
  loading = false;
  error = '';

  constructor() {
    this.studentForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(80)]],
      last_name: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      id_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudent();
    }
  }

  loadStudent() {
    this.loading = true;
    this.studentService.getStudent(this.studentId!).subscribe({
      next: (student: Student) => {
        this.studentForm.patchValue(student);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar alumno';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const studentData: Student = this.studentForm.value;

    const request = this.isEditMode
      ? this.studentService.updateStudent(this.studentId!, studentData)
      : this.studentService.createStudent(studentData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al guardar alumno';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/students']);
  }

  get f() {
    return this.studentForm.controls;
  }
}
