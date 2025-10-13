import { Component } from '@angular/core';
import { JuegosModuleRoutingModule } from "../../modulos/juegos/juegos-routing-module";

@Component({
  selector: 'app-juego',
  imports: [JuegosModuleRoutingModule],
  templateUrl: './juego.html',
  styleUrl: './juego.scss'
})
export class Juego {

}
