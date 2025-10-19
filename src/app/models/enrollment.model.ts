export interface Enrollment {
  id?: number;
  student: number;
  course: number;
  enrolled_at?: string;
}

export interface EnrollmentCreate {
  student: number;
  course: number;
}
