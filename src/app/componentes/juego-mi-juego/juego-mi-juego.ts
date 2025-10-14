import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { DbService } from '../../servicios/db/db';
import Swal from 'sweetalert2';

interface Puerta {
  id: number;
  bomba: boolean;
  abierta: boolean;
}

@Component({
  standalone: false,
  selector: 'app-juego-mi-juego',
  templateUrl: './juego-mi-juego.html',
  styleUrl: './juego-mi-juego.scss'
})
export class JuegoMiJuego {

  comenzar  :boolean = false;
  usuarioLogeado :UserData | null = null;

  puertas :Puerta[] = [];
  piso :number = 1;
  puntaje :number = 0;
  vidas :number = 2;
  juegoTerminado :boolean = false;
  mensajeFinal :string = '';

  constructor(private router: Router, public db :DbService) {}

  ngOnInit() {
    this.comenzar = false;
  }

  nuevoJuego() {
    this.puntaje = 0;
    this.piso = 1;
    this.comenzar = true;
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.generarPuertas();
  }

  generarPuertas() {
    this.puertas = [];
    const bombaIndex = Math.floor(Math.random() * 16);

    for (let i = 0; i < 16; i++) {
      this.puertas.push({
        id: i,
        bomba: i === bombaIndex,
        abierta: false
      });
    }
  }

  /**
   * 
   * @param puerta 
   * @returns 
   */
  abrirPuerta(puerta: Puerta) {
    if (this.juegoTerminado || puerta.abierta) return;

    puerta.abierta = true;    

    if (puerta.bomba) {

      this.vidas--;

      if(this.vidas <= 0) {
        this.juegoTerminado = true;
        this.gameOver();
      }
      else {
        Swal.fire({
          title: "💥 Te queda la última vida",
          icon: "warning"
        })
        this.nuevoPiso();
      }

    } else {

      this.puntaje += 10;

      const puertasRestantes = this.puertas.filter(p => !p.abierta);
      const segurasRestantes = puertasRestantes.filter(p => !p.bomba);

      if (segurasRestantes.length === 0) {
        
        if(this.piso == 1) {
          this.piso++;

          Swal.fire({
            title: "Segundo piso",
            text: `Rescatá a los demás perros!.`,
            icon: "info"
          })

          this.nuevoPiso();
        }
        else {
          this.gameOver();
        }
      }
    }

  }

  nuevoPiso() {
    this.piso++;
    this.generarPuertas();
  }

  /**
   * 
   */
  gameOver() {

    this.db.guardarResultadosJuegos(this.usuarioLogeado!.ID, this.usuarioLogeado!.NOMBRE, 1, this.puntaje);

    Swal.fire({
      title: "🐶 Se acabó!",
      text: `Tu puntaje fue de ${this.puntaje}.`,
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
  onUsuarioLogeado(user: UserData) {
    if (!user) {
      console.error('Usuario no logeado');
      this.router.navigate(['/error']);
      return;
    }
    this.usuarioLogeado = user;
  }
}


