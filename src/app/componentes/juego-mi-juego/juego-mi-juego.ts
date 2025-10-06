import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';

@Component({
  standalone: false,
  selector: 'app-juego-mi-juego',
  templateUrl: './juego-mi-juego.html',
  styleUrl: './juego-mi-juego.scss'
})
export class JuegoMiJuego {

  comenzar :Boolean = false;

  usuarioLogeado :UserData | null = null;

  vidas :number = 3;
  puntaje :number = 0;

  constructor(private router :Router) {}

  nuevoJuego() {
    this.comenzar = true;
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
