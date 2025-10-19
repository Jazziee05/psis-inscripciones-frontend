import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css' // Changed styleUrl to styleUrls
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  
  courses: Course[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  totalCount = 0;
  hasNext = false;
  hasPrevious = false;

  readonly pdfAllUrl = this.courseService.downloadAllCoursesPdf();

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.error = '';
    
    this.courseService.getCourses(this.currentPage, this.searchTerm).subscribe({
      next: (response: ApiResponse<Course>) => {
        console.log('Respuesta del servidor:', response);
        this.courses = response.results;
        this.totalCount = response.count;
        this.hasNext = !!response.next;
        this.hasPrevious = !!response.previous;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error completo:', err);
        if (err.status === 0) {
          this.error = 'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:8000';
        } else if (err.status === 404) {
          this.error = 'Endpoint no encontrado. Verifica la URL del backend';
        } else {
          this.error = `Error al cargar cursos: ${err.message || 'Error desconocido'}`;
        }
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadCourses();
  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.loadCourses();
    }
  }

  previousPage() {
    if (this.hasPrevious) {
      this.currentPage--;
      this.loadCourses();
    }
  }

  deleteCourse(id: number) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (err) => {
          alert('Error al eliminar curso');
          console.error(err);
        }
      });
    }
  }
}
