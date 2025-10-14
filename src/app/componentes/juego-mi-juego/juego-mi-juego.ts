import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';

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

  comenzar: boolean = false;
  usuarioLogeado: UserData | null = null;

  puertas: Puerta[] = [];
  puntaje: number = 0;
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.comenzar = false;
  }

  nuevoJuego() {
    this.puntaje = 0;
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

  abrirPuerta(puerta: Puerta) {
    if (this.juegoTerminado || puerta.abierta) return;

    puerta.abierta = true;

    if (puerta.bomba) {
      this.juegoTerminado = true;
      this.mensajeFinal = `💣 ¡BOOM! Perdiste con ${this.puntaje} puntos.`;
    } else {
      this.puntaje += 10;

      const puertasRestantes = this.puertas.filter(p => !p.abierta);
      const segurasRestantes = puertasRestantes.filter(p => !p.bomba);

      if (segurasRestantes.length === 0) {
        this.juegoTerminado = true;
        this.mensajeFinal = `🎉 ¡Ganaste! Puntaje total: ${this.puntaje}`;
      }
    }
  }

  onUsuarioLogeado(user: UserData) {
    if (!user) {
      console.error('Usuario no logeado');
      this.router.navigate(['/error']);
      return;
    }
    this.usuarioLogeado = user;
  }
}
