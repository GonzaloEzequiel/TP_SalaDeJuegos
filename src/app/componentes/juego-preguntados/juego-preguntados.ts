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

  seleccionActual :string | null = null;
  correcta :string | null = null;
  bloqueado :Boolean = false;
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
   * Da inicio a un nuevo juego, reseteando las variables y comenzando la primera ronda
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

    this.seleccionActual = seleccion;
    this.correcta = this.nombrePersonaje; 
    this.bloqueado = true;

    if(seleccion === this.correcta) {
      this.puntaje+= 10;
    }

    setTimeout(() => {

      
      if(this.ronda < this.maxRondas)  {
        this.ronda++;
        this.nuevaRonda();
        this.resetColores();
      }
      else
        this.gameOver();

    }, 1000);

  }

  /**
   * Resetea las variables de colores y selección
   */
  resetColores() {
    this.seleccionActual = null;
    this.correcta = null;
    this.bloqueado = false;
  }

  /**
   * asigna la clase CSS correspondiente a cada opción según si es correcta, incorrecta o no seleccionada
   * @param opcion Opción a evaluar
   * @returns 
   */
  getClass(opcion: string) {
    
    if (!this.seleccionActual) return '';

    if (opcion === this.correcta) return 'correcto';
    if (opcion === this.seleccionActual && this.seleccionActual !== this.correcta) return 'incorrecto';

    return '';
  }



  /**
   * Da por finalizado el juego, guardando los resultados y mostrando el puntaje final
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

}
