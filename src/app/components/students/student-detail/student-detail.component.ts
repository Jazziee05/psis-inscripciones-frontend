import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student, StudentCourse } from '../../../models/student.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);

  student: Student | null = null;
  courses: StudentCourse[] = [];
  loading = false;
  error = '';
  studentId!: number;

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent();
    this.loadCourses();
  }

  loadStudent() {
    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (student: Student) => {
        this.student = student;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar alumno';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadCourses() {
    this.studentService.getStudentCourses(this.studentId).subscribe({
      next: (courses: StudentCourse[]) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error al cargar cursos:', err);
      }
    });
  }

  get pdfUrl(): string {
    return this.studentService.downloadStudentPdf(this.studentId);
  }

  downloadPdf() {
    const url = this.studentService.downloadStudentPdf(this.studentId);
    window.open(url, '_blank');
  }
}
