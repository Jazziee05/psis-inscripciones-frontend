import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../models/enrollment.model';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-enrollment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './enrollment-detail.component.html',
  styleUrl: './enrollment-detail.component.css'
})
export class EnrollmentDetailComponent implements OnInit {
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  enrollment: Enrollment | null = null;
  student: Student | null = null;
  course: Course | null = null;
  loading = false;
  error = '';
  enrollmentId!: number;

  ngOnInit() {
    this.enrollmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEnrollment();
  }

  loadEnrollment() {
    this.loading = true;
    this.enrollmentService.getEnrollment(this.enrollmentId).subscribe({
      next: (enrollment: Enrollment) => {
        this.enrollment = enrollment;
        this.loadStudent(enrollment.student);
        this.loadCourse(enrollment.course);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar matriculación';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadStudent(studentId: number) {
    this.studentService.getStudent(studentId).subscribe({
      next: (student: Student) => {
        this.student = student;
      },
      error: (err) => {
        console.error('Error al cargar alumno:', err);
      }
    });
  }

  loadCourse(courseId: number) {
    this.courseService.getCourse(courseId).subscribe({
      next: (course: Course) => {
        this.course = course;
      },
      error: (err) => {
        console.error('Error al cargar curso:', err);
      }
    });
  }

  deleteEnrollment() {
    if (confirm('¿Estás seguro de eliminar esta matriculación?')) {
      this.enrollmentService.deleteEnrollment(this.enrollmentId).subscribe({
        next: () => {
          this.router.navigate(['/enrollments']);
        },
        error: (err) => {
          alert('Error al eliminar matriculación');
          console.error(err);
        }
      });
    }
  }
}
