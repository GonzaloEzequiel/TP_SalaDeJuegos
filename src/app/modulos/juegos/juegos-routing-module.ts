import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoAhorcado } from '../../componentes/juego-ahorcado/juego-ahorcado';
import { JuegoMayorMenor } from '../../componentes/juego-mayor-menor/juego-mayor-menor';
import { JuegoPreguntados } from '../../componentes/juego-preguntados/juego-preguntados';
import { JuegoMiJuego } from '../../componentes/juego-mi-juego/juego-mi-juego';

const routes: Routes = [
  {
    path: 'ahorcado',
    component: JuegoAhorcado
  },
  {
    path: 'mayormenor',
    component: JuegoMayorMenor
  },
  {
    path: 'preguntados',
    component: JuegoPreguntados
  },
  {
    path: 'mijuego',
    component: JuegoMiJuego
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosModuleRoutingModule { }
