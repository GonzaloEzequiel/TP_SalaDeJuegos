import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user-data';

@Component({
  standalone: false,
  selector: 'app-juego-preguntados',
  templateUrl: './juego-preguntados.html',
  styleUrl: './juego-preguntados.scss'
})
export class JuegoPreguntados {

  usuarioLogeado :UserData | null = null;

  susbcripcion! :Subscription;

  cantidadPersonajes = 0;
  ronda :number = 1;
  nombrePersonaje :string = "";
  imagenPersonaje :string = "";
  opcionA :string = "";
  opcionB :string = "";
  opcionC :string = "";
  opcionD :string = "";
  puntaje :number = 0;

  constructor(private http :HttpClient, private router :Router) {}

  ngOnInit() {

    this.http.get<any>(`https://rickandmortyapi.com/api/character/`)
    .subscribe(res => {
      this.cantidadPersonajes = res.info.count;
    });

  }

  nuevoJuego() {   

    this.ronda = 1;
    this.puntaje = 0;
    this.nombrePersonaje = "";
    this.imagenPersonaje = "";    

    this.seleccionarNuevaRonda();

  } 

  async seleccionarNuevaRonda(){

    let ruletaA = Math.floor(Math.random() * this.cantidadPersonajes) +1;
    let ruletaB = Math.floor(Math.random() * this.cantidadPersonajes) +1;
    let ruletaC = Math.floor(Math.random() * this.cantidadPersonajes) +1;
    let ruletaD = Math.floor(Math.random() * this.cantidadPersonajes) +1;

    let elegido = Math.floor(Math.random() * 4);

    this.http.get<any>(`https://rickandmortyapi.com/api/character/${ruletaA},${ruletaB},${ruletaC},${ruletaD}`)
    .subscribe(res => {
      this.nombrePersonaje = res[elegido].name;
      this.imagenPersonaje = res[elegido].image;
      this.opcionA = res[0].name;   console.log("nombre1: ", res[0].name);
      this.opcionB = res[1].name;   console.log("nombre2: ", res[1].name);
      this.opcionC = res[2].name;   console.log("nombre3: ", res[2].name);
      this.opcionD = res[3].name;   console.log("nombre4: ", res[3].name);
    });

  }

  adivinar(seleccion :string) {

    if(seleccion === this.nombrePersonaje) {
      this.puntaje+= 10;
    }

    this.ronda++;

    if(this.ronda <= 10) 
      this.seleccionarNuevaRonda();
    else
      this.gameOver();

  }

  // ngOnDestroy() {
  //   this.susbcripcion.unsubscribe();
  // }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {

    this.usuarioLogeado = user;

    // Valida que haya un usuario logeado, sino lo redirecciona
    if(this.usuarioLogeado === null) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
    }

  }

  gameOver(){
    alert(`TEST!! Se acabó... tu puntaje: ${this.puntaje} `);
    this.nuevoJuego();
  }

}
