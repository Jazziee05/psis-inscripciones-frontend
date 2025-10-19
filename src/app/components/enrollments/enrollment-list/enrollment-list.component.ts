import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../models/enrollment.model';
import { Student } from '../../../models/student.model';
import { Course } from '../../../models/course.model';
import { ApiResponse } from '../../../models/api-response.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.css'
})
export class EnrollmentListComponent implements OnInit {
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  
  enrollments: Enrollment[] = [];
  students: Map<number, Student> = new Map();
  courses: Map<number, Course> = new Map();
  loading = false;
  error = '';
  currentPage = 1;
  totalCount = 0;
  hasNext = false;
  hasPrevious = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';
    
    forkJoin({
      enrollments: this.enrollmentService.getEnrollments(this.currentPage),
      students: this.studentService.getStudents(1, ''),
      courses: this.courseService.getCourses(1, '')
    }).subscribe({
      next: (response) => {
        this.enrollments = response.enrollments.results.map((e: any) => ({
          ...e,
          enrolled_at: this.normalizeDate(e.enrolled_at),
        }));

        this.totalCount = response.enrollments.count;
        this.hasNext = !!response.enrollments.next;
        this.hasPrevious = !!response.enrollments.previous;
        
        response.students.results.forEach(s => this.students.set(s.id!, s));
        response.courses.results.forEach(c => this.courses.set(c.id!, c));
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.error = 'Error al cargar matriculaciones';
        this.loading = false;
      }
    });
  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.loadData();
    }
  }

  previousPage() {
    if (this.hasPrevious) {
      this.currentPage--;
      this.loadData();
    }
  }

  deleteEnrollment(id: number) {
    if (confirm('¿Estás seguro de eliminar esta matriculación?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => {
          alert('Error al eliminar matriculación');
          console.error(err);
        }
      });
    }
  }

  private normalizeDate(value: any): Date | null {
    if (!value) return null;

    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;

    const m = String(value).match(
      /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?$/
    );
    if (m) {
      const [, dd, MM, yyyy, HH = '00', mm = '00'] = m;
      return new Date(`${yyyy}-${MM}-${dd}T${HH}:${mm}:00`);
    }

    return null;
  }


  getStudentName(studentId: number): string {
    const student = this.students.get(studentId);
    return student ? `${student.first_name} ${student.last_name}` : 'Desconocido';
  }

  getCourseName(courseId: number): string {
    const course = this.courses.get(courseId);
    return course ? `${course.code} - ${course.title}` : 'Desconocido';
  }

  downloadAllEnrollmentsPdf() {
    const url = this.enrollmentService.downloadAllEnrollmentsPdf();
    window.open(url, '_blank');
  }
}
