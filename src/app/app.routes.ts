import { Routes } from '@angular/router';
import { logoutGuard } from './guards/logout/logout-guard';
import { adminGuard } from './guards/admin/admin-guard';
import { incFormGuard } from './guards/incForm/inc-form-guard';
import { loggedGuard } from './guards/logged/logged-guard';

export const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modulos/usuarios/usuarios-module').then(m => m.UsuarioModule),
    canMatch: [logoutGuard]
  },
  {
    path: 'juegos',
    loadChildren: () => import('./modulos/juegos/juegos-module').then(m => m.JuegosModule),
    canActivate: [loggedGuard]
  },
  {
    path : 'chat',
    loadComponent: () => import('./componentes/chat/chat').then(c => c.Chat)
  },
  {
    path : 'resultados',
    loadComponent: () => import('./componentes/resultados/resultados').then(c => c.Resultados),
    canActivate: [adminGuard]
  },
  {
    path : 'encuesta',
    loadComponent: () => import('./componentes/encuesta/encuesta').then(c => c.Encuesta),
    canDeactivate: [incFormGuard]
  },
  {
    path : 'home',
    loadComponent: () => import('./componentes/home/home').then(c => c.Home)
  },  
  {
    path : 'quiensoy',
    loadComponent: () => import('./componentes/quien-soy/quien-soy').then(c => c.QuienSoy)
  },
  {
    path: '**',
    loadComponent: () => import('./componentes/error/error').then(c => c.Error)
  }

];
