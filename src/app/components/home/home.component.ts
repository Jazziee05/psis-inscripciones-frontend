import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly pdfAllCoursesUrl = `${environment.apiBase}/courses/report-pdf-all/?download=0`;
  readonly pdfAllStudentsUrl = `${environment.apiBase}/students/report-all/?download=0`;
  readonly pdfAllEnrollmentsUrl = `${environment.apiBase}/enrollments/report-all-enrollments/?download=0`;


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
