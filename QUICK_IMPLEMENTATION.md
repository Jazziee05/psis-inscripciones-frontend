# Guía Rápida de Implementación

## ✅ YA IMPLEMENTADO

### Students - 100% Funcional
- ✅ **student-list**: Búsqueda, paginación, CRUD, PDF todos
- ✅ **student-form**: Crear/Editar con validaciones completas
- ✅ **student-detail**: Ver alumno + cursos + PDF individual

### Home - 100% Funcional
- ✅ Cards con navegación
- ✅ Enlaces a PDFs globales
- ✅ Diseño responsive

### App Component - 100% Funcional
- ✅ Navbar con routing
- ✅ Estilos con paleta de colores

## 📋 PENDIENTE (Copiar y Adaptar de Students)

### Courses - Copiar de Students y cambiar:

**course-list.component.ts**:
```typescript
// Cambiar:
StudentService → CourseService
Student → Course
students → courses
'alumnos' → 'cursos'
searchTerm busca en: code, title
```

**course-list.component.html**:
```html
<!-- Cambiar columnas tabla:
ID | Código | Título | Capacidad | Acciones
-->
```

**course-form.component.ts**:
```typescript
// Campos del formulario:
code: ['', [Validators.required, Validators.maxLength(10)]],
title: ['', [Validators.required, Validators.maxLength(120)]],
capacity: [30, [Validators.required, Validators.min(1)]]
```

**course-detail.component.ts**:
```typescript
// Cambiar:
StudentService → CourseService
getStudentCourses → getCourseStudents
StudentCourse → CourseStudent
courses → students (invertir la relación)
```

### Enrollments

**enrollment-list.component.ts**:
```typescript
import { EnrollmentService } from '../../../services/enrollment.service';
import { Enrollment } from '../../../models/enrollment.model';

// Sin búsqueda, solo paginación
// Mostrar: ID, Student ID, Course ID, Fecha
```

**enrollment-form.component.ts**:
```typescript
// Cargar listas de alumnos y cursos en ngOnInit
students$ = this.studentService.getStudents(1, '');
courses$ = this.courseService.getCourses(1, '');

// Form:
enrollmentForm = this.fb.group({
  student: ['', Validators.required],
  course: ['', Validators.required]
});

// Submit:
this.enrollmentService.createEnrollment(this.enrollmentForm.value)
```

## 🚀 Para Probar

```bash
npm start
```

Navega a:
- http://localhost:4200 → Home
- http://localhost:4200/students → Lista de alumnos
- http://localhost:4200/students/new → Crear alumno
- http://localhost:4200/courses → Cursos (implementar)
- http://localhost:4200/enrollments → Matrículas (implementar)

## ⚡ Atajo Rápido

Si quieres que funcione YA:

1. **Courses**: Copia los 3 archivos de students, reemplaza todas las ocurrencias:
   - `Student` → `Course`
   - `student` → `course`
   - Ajusta campos del modelo

2. **Enrollments**: Crea form simple con 2 selects

El proyecto está **70% funcional** con Students completamente operativo.
