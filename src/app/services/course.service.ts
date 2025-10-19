import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseStudent } from '../models/course.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBase}/api/courses`;

  getCourses(page: number = 1, search: string = ''): Observable<ApiResponse<Course>> {
    let url = `${this.apiUrl}/?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    return this.http.get<ApiResponse<Course>>(url);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}/`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/`, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}/`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  getCourseStudents(id: number): Observable<CourseStudent[]> {
    return this.http.get<CourseStudent[]>(`${this.apiUrl}/${id}/students/`);
  }

  downloadCoursePdf(id: number): string {
    return `${this.apiUrl}/${id}/report-pdf/?download=0`;
  }

  downloadAllCoursesPdf(): string {
    return `${this.apiUrl}/report-pdf-all/?download=0`;
  }
}
