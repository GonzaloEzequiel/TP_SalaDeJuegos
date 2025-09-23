import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [   
    RouterOutlet, 
    FormsModule
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
