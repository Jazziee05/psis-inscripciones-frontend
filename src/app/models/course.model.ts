export interface Course {
  id?: number;
  code: string;
  title: string;
  capacity: number;
}

export interface CourseStudent {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  id_number: string;
  enrolled_at: string;
}
