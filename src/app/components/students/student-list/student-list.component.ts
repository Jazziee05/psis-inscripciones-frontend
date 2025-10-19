import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);
  
  students: Student[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  totalCount = 0;
  hasNext = false;
  hasPrevious = false;

  readonly pdfAllUrl = this.studentService.downloadAllStudentsPdf();

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = '';
    
    this.studentService.getStudents(this.currentPage, this.searchTerm).subscribe({
      next: (response: ApiResponse<Student>) => {
        console.log('Respuesta del servidor:', response);
        this.students = response.results;
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
          this.error = `Error al cargar alumnos: ${err.message || 'Error desconocido'}`;
        }
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadStudents();
  }

  nextPage() {
    if (this.hasNext) {
      this.currentPage++;
      this.loadStudents();
    }
  }

  previousPage() {
    if (this.hasPrevious) {
      this.currentPage--;
      this.loadStudents();
    }
  }

  deleteStudent(id: number) {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (err) => {
          alert('Error al eliminar alumno');
          console.error(err);
        }
      });
    }
  }
}
