import { Component } from '@angular/core';
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-quien-soy',
  imports: [Menu],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.scss'
})
export class QuienSoy {

  private static nombre :string = "Gonzalo Ezequiel Pérez";
  private static correo :string = "gep.perez@gmail.com";
  private static imagen :string = "";
  private expicacionJuego :string  = "";

}
