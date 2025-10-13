import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ahorcado',
    loadComponent: () => import('../../componentes/juego-ahorcado/juego-ahorcado').then(c => c.JuegoAhorcado)
  },
  {
    path: 'mayormenor',
    loadComponent: () => import('../../componentes/juego-mayor-menor/juego-mayor-menor').then(c => c.JuegoMayorMenor)
  },
  {
    path: 'preguntados',
    loadComponent: () => import('../../componentes/juego-preguntados/juego-preguntados').then(c => c.JuegoPreguntados)
  },
  {
    path: 'mijuego',
    loadComponent: () => import('../../componentes/juego-mi-juego/juego-mi-juego').then(c => c.JuegoMiJuego)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosModuleRoutingModule { }
