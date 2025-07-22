import { ApplicationConfig } from '@angular/core'; // usado para definir a configuração da aplicação
import { provideRouter } from '@angular/router'; // usado para definir as rotas
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // usado para fazer requisições HTTP
import { provideAnimations } from '@angular/platform-browser/animations'; // usado para definir as animações

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = { // usado para definir a configuração da aplicação
  providers: [
    provideRouter(routes), // usado para definir as rotas
    provideHttpClient(withInterceptors([authInterceptor])), // usado para fazer requisições HTTP
    provideAnimations() // usado para definir as animações
  ]
};
