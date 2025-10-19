import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentCourse } from '../models/student.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBase}/api/students`;

  getStudents(page: number = 1, search: string = ''): Observable<ApiResponse<Student>> {
    let url = `${this.apiUrl}/?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.http.get<ApiResponse<Student>>(url);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}/`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}/`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  getStudentCourses(id: number): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(`${this.apiUrl}/${id}/courses/`);
  }

  downloadStudentPdf(id: number): string {
    return `${this.apiUrl}/${id}/report-pdf/?download=0`;
  }

  downloadAllStudentsPdf(): string {
    return `${this.apiUrl}/report-all/?download=0`;
  }
}
