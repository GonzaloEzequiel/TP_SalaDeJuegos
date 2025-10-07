import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Db {

  client = createClient(environment.apiUrl, environment.publicAnonKey);

  constructor() {}

  /**
   * Almacena en la BBDD los puntajes de los jugadores/juegos en la tabla 'RESULTADOS_JUEGOS'
   * @param idUsuario 
   * @param usuario 
   * @param idJuego 
   * @param puntaje 
   */
  guardarResultadosJuegos(idUsuario :number, usuario :string, idJuego :number, puntaje :number) {

    this.client.from('RESULTADOS_JUEGOS').insert({
      ID_USUARIO: idUsuario,
      USUARIO: usuario,
      ID_JUEGO: idJuego,
      PUNTAJE: puntaje      
    })
    .then(({data, error}) => {
      if(error)
        console.error(`Error: ${error.message}`);
      else
        console.table(['Usuario', 'Puntaje']);
        console.table([usuario, puntaje]);
    });

  }
  
}
