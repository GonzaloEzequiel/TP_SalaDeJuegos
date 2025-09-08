import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Login } from "./componentes/login/login";
import { QuienSoy } from "./componentes/quien-soy/quien-soy";
import { Home } from "./componentes/home/home";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    Login,
    QuienSoy,
    Home,
    NgIf
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
  //template: <label>Poné tu nombre: </label> <input type="text" id="name" [(ngModel)]="nombre" />
})
export class App {
  protected readonly title = signal('sandbox0');

  mostrarLogin = false;

  // nombre :string = "";

  // metodo () {
  //   return this.nombre !== "" ? this.nombre : "Un método";
  // }
}
