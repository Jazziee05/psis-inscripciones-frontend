# Sistema PSIS - Inscripciones Frontend



### ✅ Estructura Completa

1. **Modelos** creados en `src/app/models/`:
   - student.model.ts
   - course.model.ts
   - enrollment.model.ts
   - api-response.model.ts

2. **Servicios** creados en `src/app/services/`:
   - student.service.ts
   - course.service.ts
   - enrollment.service.ts

3. **Componentes** generados:
   - Home
   - Students (list, form, detail)
   - Courses (list, form, detail)
   - Enrollments (list, form, detail)

4. **Routing** configurado en `app.routes.ts`

5. **HTTP Client** configurado en `app.config.ts`

El proyecto se iniciará en http://localhost:4200

### 🎨 Paleta de Colores
- Primary: #7400b8
- Secondary: #5390d9
- Accent: #48bfe3
- Light: #72efdd
- Lighter: #80ffdb

### 🔗 Backend API
- Base URL: http://localhost:8000
- Los servicios ya están configurados para consumir la API

###  Arquitectura
- Standalone Components (Angular 20)
- Reactive Forms
- HttpClient para API REST
- RouterLink para navegación
- PDF downloads desde backend
