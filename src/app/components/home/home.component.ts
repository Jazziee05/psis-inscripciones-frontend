import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly pdfAllCoursesUrl = 'http://localhost:8000/api/courses/report-pdf-all/?download=0';
  readonly pdfAllStudentsUrl = 'http://localhost:8000/api/students/report-all/?download=0';
  readonly pdfAllEnrollmentsUrl = 'http://localhost:8000/api/enrollments/report-all-enrollments/?download=0';


  downloadAllStudentsPdf() {
    window.open(this.pdfAllStudentsUrl, '_blank');
  }

  downloadAllCoursesPdf() {
    window.open(this.pdfAllCoursesUrl, '_blank');
  }

  downloadAllEnrollmentsPdf() {
    window.open(this.pdfAllEnrollmentsUrl, '_blank');
  }
}
