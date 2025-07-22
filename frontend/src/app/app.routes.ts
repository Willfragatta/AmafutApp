import { Routes } from '@angular/router'; // usado para definir as rotas
import { MainLayoutComponent } from './components/main-layout'; // usado para definir o layout principal
import { AuthGuard } from './guards/auth.guard'; // usado para definir o guard de autenticação
import { AdminGuard } from './guards/admin.guard'; // usado para definir o guard de admin

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard').then(m => m.Dashboard) },
      { path: 'perfil', loadComponent: () => import('./pages/perfil').then(m => m.Perfil) },
      { path: 'eventos', loadComponent: () => import('./pages/eventos').then(m => m.Eventos) },
      { path: 'analise-atletas', canActivate: [AdminGuard], loadComponent: () => import('./pages/analise-atletas').then(m => m.AnaliseAtletas) },
      { path: 'meu-desempenho', loadComponent: () => import('./pages/meu-desempenho').then(m => m.MeuDesempenho) },
      { path: 'metas', loadComponent: () => import('./pages/metas').then(m => m.Metas) },
      { path: 'notificacoes', loadComponent: () => import('./pages/notificacoes').then(m => m.Notificacoes) },
      { path: 'info-equipe', loadComponent: () => import('./pages/info-equipe').then(m => m.InfoEquipe) },
      { path: 'admin/aprovar-usuarios', canActivate: [AdminGuard], loadComponent: () => import('./pages/admin-aprovar-usuarios').then(m => m.AdminAprovarUsuarios) },
      { path: 'admin/criar-evento', canActivate: [AdminGuard], loadComponent: () => import('./pages/admin-criar-evento').then(m => m.AdminCriarEvento) },
      { path: 'admin/criar-analise', canActivate: [AdminGuard], loadComponent: () => import('./pages/admin-criar-analise').then(m => m.AdminCriarAnalise) },
      { path: 'admin/criar-meta', canActivate: [AdminGuard], loadComponent: () => import('./pages/admin-criar-meta').then(m => m.AdminCriarMeta) },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
