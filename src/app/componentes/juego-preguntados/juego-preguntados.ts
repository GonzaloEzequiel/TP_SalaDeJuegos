import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { PreguntadosService } from '../../servicios/preguntados/preguntados';
import { DbService } from '../../servicios/db/db';
import Swal from 'sweetalert2'

@Component({
  standalone: false,
  selector: 'app-juego-preguntados',
  templateUrl: './juego-preguntados.html',
  styleUrl: './juego-preguntados.scss'
})
export class JuegoPreguntados {

  comenzar :Boolean = false;

  usuarioLogeado :UserData | null = null;

  ronda :number = 1;
  maxRondas :number = 10;
  puntaje :number = 0;

  nombrePersonaje :string = "";
  imagenPersonaje :string = "";
  opcionA :string = "";
  opcionB :string = "";
  opcionC :string = "";
  opcionD :string = "";

  constructor(private router :Router, public preguntados :PreguntadosService, public db :DbService) {}

  ngOnInit() {
    this.comenzar = false;
  }

  /**
   * 
   */
  nuevoJuego() {   

    this.comenzar = true;

    this.ronda = 1;
    this.puntaje = 0;
    this.nombrePersonaje = "";
    this.imagenPersonaje = "";
    this.opcionA = "", this.opcionB ="", this.opcionC ="", this.opcionD = "";

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

  /**
   * 
   */
  gameOver(){

    this.db.guardarResultadosJuegos(this.usuarioLogeado!.ID, this.usuarioLogeado!.NOMBRE, 3, this.puntaje);


    Swal.fire({
      title: "🤖 Se acabó !!",
      text: `Tu puntaje fue de: ${this.puntaje}`,
      icon: "success"
    })
    .then(() => {
    
      Swal.fire({
        title: "Te jugás otra partida?",
        text: 'Elegí "No!" para volver al menu de juegos',
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#58cb49ff",
        cancelButtonColor: "#6096BA",
        confirmButtonText: "Sí!",
        cancelButtonText: "No!"
      })
      .then((result) => {
        if (result.isConfirmed)
          this.ngOnInit();
        else 
          this.router.navigate(['/home']);
      });
    });

  }

}
