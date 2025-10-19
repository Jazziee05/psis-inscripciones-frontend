export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  id_number: string;
}

export interface StudentCourse {
  course_id: number;
  code: string;
  title: string;
  enrolled_at: string;
}
//Las interfaces existen para que el frontend “entienda” con precisión la forma de los datos que manipula, evitando errores y haciendo el código más robusto y mantenible.