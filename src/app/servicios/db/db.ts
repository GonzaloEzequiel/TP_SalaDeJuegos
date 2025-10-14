import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  client = createClient(environment.apiUrl, environment.publicAnonKey);

  constructor() {}

  /**
   * Almacena en la BBDD los puntajes de los jugadores/juegos en la tabla 'RESULTADOS'
   * @param idUsuario 
   * @param usuario 
   * @param idJuego 
   * @param puntaje 
   */
  guardarResultadosJuegos(idUsuario :number, usuario :string, idJuego :number, puntaje :number) {

    this.client.from('RESULTADOS').insert({
      ID_USUARIO: idUsuario,
      USUARIO: usuario,
      ID_JUEGO: idJuego,
      PUNTAJE: puntaje      
    })
    .then(({data, error}) => {
      if(error)
        console.error(`Error: ${error.message}`);
      else
        console.table({"Usuario:" : usuario, "Juego" : idJuego, "Puntaje:" : puntaje});
    });

  }

  /**
   * 
   * @param idJuego 
   */
  async obtenerTopPuntajes(idJuego :number) {

    await this.client.from('RESULTADOS').select('USUARIO, PUNTAJE, FECHA_CREACION')
      .eq('ID_JUEGO', idJuego)
      .order('PUNTAJE', { ascending: false })
      .limit(3)
      .then(({data, error}) => {
        if(error)
          console.error(`Error: ${error.message}`);
      
        return data;
      });
  }

  /**
   * 
   */
  async obternerRespuestas() {

    try {
      const { data, error }  = await this.client.from('RESPUESTAS').select('*')
        
      if(error) {
        console.error(`Error: ${error.message}`);
        return [];
      }
      
      return data || [];

    }
    catch(error) {
      console.error('Error obteniendo respuestas: ', error);
      return [];
    }

  }
}
