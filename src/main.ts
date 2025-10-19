import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) //bootstrapApplication
  .catch((err) => console.error(err));
//es el punto de entrada principal de tu aplicación