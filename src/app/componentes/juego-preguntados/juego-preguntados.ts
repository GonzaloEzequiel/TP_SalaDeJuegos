import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { Preguntados } from '../../servicios/preguntados';

@Component({
  standalone: false,
  selector: 'app-juego-preguntados',
  templateUrl: './juego-preguntados.html',
  styleUrl: './juego-preguntados.scss'
})
export class JuegoPreguntados {

  usuarioLogeado :UserData | null = null;

  ronda :number = 1;
  maxRondas :number = 10;
  nombrePersonaje :string = "";
  imagenPersonaje :string = "";
  opcionA :string = "";
  opcionB :string = "";
  opcionC :string = "";
  opcionD :string = "";
  puntaje :number = 0;

  constructor(private router :Router, public preguntados :Preguntados) {}

  nuevoJuego() {   

    this.ronda = 1;
    this.puntaje = 0;
    this.nombrePersonaje = "";
    this.imagenPersonaje = "";    

    this.nuevaRonda();

  } 

  /**
   * Arma una nueva ronda invocando al Servicio
   */
  nuevaRonda() {
    this.preguntados.getPersonajesNuevaRonda()
      .subscribe( res =>{

        let elegido = Math.floor(Math.random() * 4);

        this.nombrePersonaje = res[elegido].name;
        this.imagenPersonaje = res[elegido].image;
        this.opcionA = res[0].name;
        this.opcionB = res[1].name;
        this.opcionC = res[2].name;
        this.opcionD = res[3].name;

      });
  }

  /**
   * Valida la selección del usuario, y suma los puntos si corresponde
   * @param seleccion 
   */
  adivinar(seleccion :string) {

    if(seleccion === this.nombrePersonaje) {
      this.puntaje+= 10;
    }

    this.ronda++;

    if(this.ronda <= this.maxRondas) 
      this.nuevaRonda();
    else
      this.gameOver();

  }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {

    if(!user) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
      return;
    }
    
    this.usuarioLogeado = user;

  }

  gameOver(){
    alert(`TEST!! Se acabó... tu puntaje: ${this.puntaje} `);
    this.nuevoJuego();
  }

}
