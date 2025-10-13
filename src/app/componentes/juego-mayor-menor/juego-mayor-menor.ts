import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user-data';
import { DbService } from '../../servicios/db/db';
import Swal from 'sweetalert2'

@Component({
  standalone: false,
  selector: 'app-juego-mayor-menor',
  templateUrl: './juego-mayor-menor.html',
  styleUrl: './juego-mayor-menor.scss'
})
export class JuegoMayorMenor {

  comenzar :Boolean = false;

  usuarioLogeado :UserData | null = null;
  susbcripcion! :Subscription;

  puntaje :number = 0;

  mazo :string = "";
  cant :number = 0;
  imagenCartaVieja :string = "";
  imagenCartaNueva :string = "";
  valorCartaVieja :number = 0;
  valorCartaNueva :number = 0;

  constructor(private http: HttpClient, private router :Router, public db :DbService) {}

  ngOnInit() {
    this.comenzar = false;
  }

  /**
   * 
   */
  nuevoJuego() {
    this.comenzar = true;
    this.puntaje = 0;
    this.imagenCartaVieja = "";

    this.susbcripcion = this.http.get<any>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
    .subscribe(res => {
      if (res.success) {
        this.mazo = res.deck_id; 
        this.cant = res.remaining;
      }        
      else
        console.error("Falló la API para obtener el mazo");

      this.robarCarta();
    });
  }


  /**
   * 
   * @returns 
   */
  async robarCarta(): Promise<void> {    

    return new Promise((resolve, reject) => {

      this.http.get<any>(`https://deckofcardsapi.com/api/deck/${this.mazo}/draw/?count=1`)
      .subscribe({
        next: (res) => {
            
          this.valorCartaVieja = this.valorCartaNueva;
          this.imagenCartaVieja = this.imagenCartaNueva;
          this.imagenCartaNueva = res.cards[0].image;

          switch (res.cards[0].value) {
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

          this.cant = res.remaining;
          resolve();
          
        },
        error: (err) => reject(err)
      
      });
    });
  }

  /**
   * Evalúa la respuesta del usuario y procesa el puntaje según corresponda
   * @param opcion el tipo de apuesta
   */
  async apostar(opcion :string) {

    try {
      await this.robarCarta();

      if( (opcion === "menor" && this.valorCartaNueva < this.valorCartaVieja) ||
          (opcion === "mayor" && this.valorCartaNueva > this.valorCartaVieja) )
        this.puntaje += 2;
      else if(opcion === "igual" && this.valorCartaNueva == this.valorCartaVieja) 
        this.puntaje += 20;
      else if(this.puntaje > 0 && this.valorCartaNueva != this.valorCartaVieja)
        this.puntaje --;

      if(this.cant == 0)
        this.gameOver();

    }
    catch (err) {
      console.error("Error al apostar:", err);
    }    
  }

  /**
   * 
   */
  gameOver(){

    this.db.guardarResultadosJuegos(this.usuarioLogeado!.ID, this.usuarioLogeado!.NOMBRE, 2, this.puntaje);

    Swal.fire({
      title: "♠️ Se acabó!",
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

  ngOnDestroy() {
    if(this.susbcripcion)
      this.susbcripcion.unsubscribe();
  }

  /**
   * Recibe información del usuario logeado en el componente menú
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
