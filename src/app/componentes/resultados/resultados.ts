import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss'
})
export class Resultados {

  usuarioLogeado :UserData | null = null;

  constructor(private router :Router) {}


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
