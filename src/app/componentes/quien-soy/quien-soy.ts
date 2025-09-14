import { Component } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  imports: [],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.scss'
})
export class QuienSoy {

  private static nombre :string = "Gonzalo Ezequiel Pérez";
  private static correo :string = "gep.perez@gmail.com";
  private static imagen :string = "";
  private expicacionJuego :string  = "";

}
