# Guía de Implementación - Sistema PSIS Inscripciones

## ✅ Archivos Ya Creados

### Modelos (`src/app/models/`)
- ✅ student.model.ts - Interface Student, StudentCourse
- ✅ course.model.ts - Interface Course, CourseStudent  
- ✅ enrollment.model.ts - Interface Enrollment, EnrollmentCreate
- ✅ api-response.model.ts - Interface ApiResponse<T>

### Servicios (`src/app/services/`)
- ✅ student.service.ts - CRUD completo + PDF downloads
- ✅ course.service.ts - CRUD completo + PDF downloads
- ✅ enrollment.service.ts - CRUD completo

### Configuración
- ✅ app.routes.ts - Rutas configuradas para todos los módulos
- ✅ app.config.ts - HttpClient configurado

### Componentes Generados
- ✅ Estructura de carpetas creada
- ✅ 8 componentes generados con CLI

## 📋 Archivos que Necesitan Implementación

### 1. app.component.html
Reemplazar todo el contenido por:

```html
<nav class="navbar">
  <div class="navbar-content">
    <h1 class="navbar-logo">PSIS - Sistema de Matrículas</h1>
    <ul class="navbar-menu">
      <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
      <li><a routerLink="/students" routerLinkActive="active">Alumnos</a></li>
      <li><a routerLink="/courses" routerLinkActive="active">Cursos</a></li>
      <li><a routerLink="/enrollments" routerLinkActive="active">Matrículas</a></li>
    </ul>
  </div>
</nav>
<div class="container">
  <router-outlet></router-outlet>
</div>
```

### 2. app.component.ts
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PSIS - Inscripciones';
}
```

### 3. app.component.css
```css
.navbar {
  background: linear-gradient(135deg, #7400b8 0%, #5390d9 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.navbar-menu a:hover {
  background: rgba(255,255,255,0.1);
}

.navbar-menu a.active {
  background: rgba(255,255,255,0.2);
  font-weight: bold;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
```

### 4. styles.css (archivo global)
```css
:root {
  --primary: #7400b8;
  --secondary: #5390d9;
  --accent: #48bfe3;
  --light: #72efdd;
  --lighter: #80ffdb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: #5a0090;
}

.btn-secondary {
  background: var(--secondary);
  color: white;
}

.btn-accent {
  background: var(--accent);
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

th, td {
  padding: 1rem;
  text-align: left;
}

th {
  background: var(--primary);
  color: white;
}

tr:nth-child(even) {
  background: #f9f9f9;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.search-box {
  margin-bottom: 2rem;
}

.search-box input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button.active {
  background: var(--primary);
  color: white;
}
```

## 🚀 Iniciar Proyecto

### 1. Instalar dependencias
```bash
cd E:\0000_archivos_op\github\psis-inscripciones-frontend
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm start
```

### 3. Abrir en navegador
```
http://localhost:4200
```

## 📦 Componentes a Implementar

Cada componente necesita su archivo `.html`, `.ts` y `.css`. Los archivos están en:

```
src/app/components/
├── home/
│   ├── home.component.html
│   ├── home.component.ts
│   └── home.component.css
├── students/
│   ├── student-list/
│   ├── student-form/
│   └── student-detail/
├── courses/
│   ├── course-list/
│   ├── course-form/
│   └── course-detail/
└── enrollments/
    ├── enrollment-list/
    └── enrollment-form/
```

## 🎯 Funcionalidades Requeridas

### Students (Alumnos)
- **List**: Tabla con búsqueda, botones Ver/Editar/Eliminar, botón "Descargar PDF Todos"
- **Form**: Formulario crear/editar con validaciones
- **Detail**: Ver alumno, lista de cursos inscritos, botón "Descargar PDF"

### Courses (Cursos)
- **List**: Tabla con búsqueda, botones Ver/Editar/Eliminar, botón "Descargar PDF Todos"
- **Form**: Formulario crear/editar con validaciones
- **Detail**: Ver curso, lista de alumnos inscritos, botón "Descargar PDF"

### Enrollments (Matrículas)
- **List**: Tabla con todas las matriculaciones
- **Form**: Select de alumno + Select de curso, botón Matricular

## 📚 Referencias API Backend

Los servicios ya están configurados para:
- GET /api/students/ - Listar alumnos (paginado, búsqueda)
- POST /api/students/ - Crear alumno
- PUT /api/students/{id}/ - Actualizar alumno
- DELETE /api/students/{id}/ - Eliminar alumno
- GET /api/students/{id}/courses/ - Cursos del alumno
- GET /api/students/{id}/report-pdf/ - PDF del alumno
- GET /api/students/report-all/ - PDF todos los alumnos

(Similar para courses y enrollments)

## 🎨 Paleta de Colores Aplicada

```css
--primary: #7400b8
--secondary: #5390d9
--accent: #48bfe3
--light: #72efdd
--lighter: #80ffdb
```

## ⚠️ Notas Importantes

1. Todos los servicios ya están inyectados correctamente
2. Los modelos TypeScript coinciden con la API
3. El routing está completo
4. HttpClient configurado
5. Los componentes son standalone (Angular 20)
6. Usa ReactiveFormsModule para los formularios
7. Importa CommonModule para *ngFor, *ngIf


