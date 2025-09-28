import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user-data';

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
  puntaje :number = 0;

  constructor(private http: HttpClient, private router :Router) {}

  ngOnInit() {
    
  }

  nuevoJuego() {
    this.puntaje = 0;

    this.susbcripcion = this.http.get<any>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
    .subscribe(res => {
      if (res.success)
        this.mazo = res.deck_id;
      else
        console.error("Falló la API para obtener el mazo");

      this.robarCarta();
    });
  }

  async robarCarta() {

    console.log(this.valorCartaVieja);
    console.log(this.valorCartaNueva);



    this.valorCartaVieja = this.valorCartaNueva;
    this.imagenCartaVieja = this.imagenCartaNueva;

    this.http.get<any>(`https://deckofcardsapi.com/api/deck/${this.mazo}/draw/?count=1`)
    .subscribe(res => {
      if(res.success) {
        this.imagenCartaNueva = res.cards[0].image;
        switch(res.cards[0].value) {
          case 'ACE':
            this.valorCartaNueva = 1;
            break;
          case 'JACK':
            this.valorCartaNueva = 11;
            break;
          case 'QUEEN':
            this.valorCartaNueva = 12;
            break;
          case 'KING':
            this.valorCartaNueva = 13;
            break;
          default:
            this.valorCartaNueva = parseInt(res.cards[0].value);
            break;
        }                  
      }
      else
        console.error("Falló la API para robar carta");
    });

  }

  async apostar(opcion :string) {

    this.robarCarta()
    .then(() => {

      console.log(`Apuesta: ${this.valorCartaNueva} ${opcion} ${this.valorCartaVieja}`);

      if( (opcion === "menor" && this.valorCartaNueva < this.valorCartaVieja) ||
          (opcion === "mayor" && this.valorCartaNueva > this.valorCartaVieja) )
        this.puntaje += 2;
      else if(opcion === "igual" && this.valorCartaNueva == this.valorCartaVieja) 
        this.puntaje += 50;
      else
        this.puntaje --;

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
