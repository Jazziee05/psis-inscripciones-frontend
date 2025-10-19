import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course, CourseStudent } from '../../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  course: Course | null = null;
  students: CourseStudent[] = [];
  loading = false;
  error = '';
  courseId!: number;

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
    this.loadStudents();
  }

  loadCourse() {
    this.loading = true;
    this.courseService.getCourse(this.courseId).subscribe({
      next: (course: Course) => {
        this.course = course;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar curso';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadStudents() {
    this.courseService.getCourseStudents(this.courseId).subscribe({
      next: (students: CourseStudent[]) => {
        this.students = students;
      },
      error: (err) => {
        console.error('Error al cargar alumnos:', err);
      }
    });
  }

  get pdfUrl(): string {
    return this.courseService.downloadCoursePdf(this.courseId);
  }

  downloadPdf() {
    const url = this.courseService.downloadCoursePdf(this.courseId);
    window.open(url, '_blank');
  }
}
