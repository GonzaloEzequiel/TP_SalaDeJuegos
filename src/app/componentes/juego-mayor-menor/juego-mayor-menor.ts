import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user-data';
import { MazoRespuesta, RobarRespuesta } from '../../models/mayorMenor-response';

@Component({
  standalone: false,
  selector: 'app-juego-mayor-menor',
  templateUrl: './juego-mayor-menor.html',
  styleUrl: './juego-mayor-menor.scss'
})
export class JuegoMayorMenor {

  usuarioLogeado :UserData | null = null;
  susbcripcion! :Subscription;
  mazo :string = "";
  imagenCartaVieja :string = "";
  imagenCartaNueva :string = "";
  valorCartaVieja :number = 0;
  valorCartaNueva :number = 0;
  puntje :number = 0;

  constructor(private http: HttpClient, private router :Router) {}

  ngOnInit() {
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.susbcripcion = this.http.get<MazoRespuesta>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
    .subscribe(res => {
      if(res.exito)
        this.mazo = res.idMazo;
      else
        console.error("Falló la API para obtener el mazo");
    });
  }

  robarCarta() {
    this.http.get<RobarRespuesta>(`https://deckofcardsapi.com/api/deck/${this.mazo}/draw/?count=2`)
    .subscribe(res => {
      if(res.exito) {
        this.imagenCartaNueva = res.cartas[0].imagen;
        this.valorCartaNueva = parseInt(res.cartas[0].valor);
      }
      else
        console.error("Falló la API para robar carta");
    });
  }

  ngOnDestroy() {
    this.susbcripcion.unsubscribe();
  }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {

    this.usuarioLogeado = user;

    // Valida que haya un usuario logeado, sino lo redirecciona
    if(this.usuarioLogeado === null) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
    }

  }

}
