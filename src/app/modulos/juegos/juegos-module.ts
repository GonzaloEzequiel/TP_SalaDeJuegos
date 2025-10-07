import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosModuleRoutingModule } from './juegos-routing-module';
import { JuegoAhorcado } from '../../componentes/juego-ahorcado/juego-ahorcado';
import { JuegoMayorMenor } from '../../componentes/juego-mayor-menor/juego-mayor-menor';
import { JuegoPreguntados } from '../../componentes/juego-preguntados/juego-preguntados';
import { JuegoMiJuego } from '../../componentes/juego-mi-juego/juego-mi-juego';
import { ReactiveFormsModule } from '@angular/forms';
import { Menu } from "../../componentes/menu/menu";


@NgModule({
  declarations: [
    JuegoAhorcado,
    JuegoMayorMenor,
    JuegoPreguntados,
    JuegoMiJuego    
  ],
  imports: [
    CommonModule,
    JuegosModuleRoutingModule,
    ReactiveFormsModule,
    Menu
  ],
  exports: [
    JuegoAhorcado,
    JuegoMayorMenor,
    JuegoPreguntados,
    JuegoMiJuego    
  ]
})
export class JuegosModule { }
