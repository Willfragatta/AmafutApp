import { bootstrapApplication } from '@angular/platform-browser'; // usado para iniciar a aplicação 
import { appConfig } from './app/app.config'; // usado para definir a configuração da aplicação
import { App } from './app/app'; // usado para definir o componente principal

bootstrapApplication(App, appConfig) // usado para iniciar a aplicação
  .catch((err) => console.error(err)); // usado para tratar erros
