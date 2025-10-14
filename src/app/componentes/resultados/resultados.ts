import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { Router } from '@angular/router';
import { Menu } from '../menu/menu';
import { DbService } from '../../servicios/db/db';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  imports: [Menu],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss'
})
export class Resultados {

  usuarioLogeado :UserData | null = null;

  respuestas :any[] = [];
  
  constructor(private router :Router, public db :DbService) {}

  async ngOnInit() {
    const data = await this.db.obternerRespuestas();

    this.respuestas = data.map( item =>  {
      if(typeof item.RESPUESTA_JUEGO === 'string') {
        try{
          item.RESPUESTA_JUEGO = JSON.parse(item.RESPUESTA_JUEGO);
        }catch(e) {
          console.error('Error parseando RESPUESTA_JUEGO: ', e);
          item.RESPUESTA_JUEGO = [item.RESPUESTA_JUEGO];
        }        
      }
      return item;
    })
  }


  mostrarSugerencia(respuesta :any) {

    Swal.fire({
      title: `Sugerencia de ${respuesta.NOMBRE_USUARIO} ${respuesta.APELLIDO_USUARIO}`,
      text: respuesta.RESPUESTA_MEJORA,
      icon: 'info',
      confirmButtonText: 'Cerrar'
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
