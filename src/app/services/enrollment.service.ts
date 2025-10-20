import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment, EnrollmentCreate } from '../models/enrollment.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBase}/enrollments`;

  getEnrollments(page: number = 1): Observable<ApiResponse<Enrollment>> {
    return this.http.get<ApiResponse<Enrollment>>(`${this.apiUrl}/?page=${page}`);
  }

  getEnrollment(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}/`);
  }

  createEnrollment(enrollment: EnrollmentCreate): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/`, enrollment);
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/by-course/${courseId}/`);
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/by-student/${studentId}/`);
  }

  downloadAllEnrollmentsPdf(): string {
    return `${this.apiUrl}/report-all-enrollments/?download=0`;
  }
}
