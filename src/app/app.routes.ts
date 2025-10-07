import { Routes } from '@angular/router';
import { Error } from './componentes/error/error';
import { Home } from './componentes/home/home';
import { QuienSoy } from './componentes/quien-soy/quien-soy';
import { Chat } from './componentes/chat/chat';

export const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modulos/usuarios/usuarios-module').then(m => m.UsuarioModule)
  },
  {
    path: 'juegos',
    loadChildren: () => import('./modulos/juegos/juegos-module').then(m => m.JuegosModule)
  },
  {
    path : 'chat',
    loadComponent: () => import('./componentes/chat/chat').then(c => c.Chat)
  },
  {
    path : 'resultados',
    loadComponent: () => import('./componentes/resultados/resultados').then(c => c.Resultados)
  },
  {
    path : 'encuesta',
    loadComponent: () => import('./componentes/encuesta/encuesta').then(c => c.Encuesta)
  },
  {
    path : 'home',
    component : Home
  },  
  {
    path : 'quiensoy',
    component : QuienSoy
  },
  
  {
    path: '**',
    component: Error
  }

];
