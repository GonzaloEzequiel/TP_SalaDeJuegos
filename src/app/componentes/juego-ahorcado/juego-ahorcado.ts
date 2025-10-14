import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user-data';
import { DbService } from '../../servicios/db/db';
import Swal from 'sweetalert2'

@Component({
  standalone: false,
  selector: 'app-juego-ahorcado',
  templateUrl: './juego-ahorcado.html',
  styleUrls: ['./juego-ahorcado.scss']
})
export class JuegoAhorcado {

  comenzar :Boolean = false;

  usuarioLogeado :UserData | null = null;
  susbcripcion!: Subscription;
  
  ronda :number = 1;
  maxRondas :number = 5;
  vidas :number = 6;
  puntaje :number = 0;
  coloresBotones: { [letra: string]: string } = {};
  
  estado: 'jugando' | 'pausa' = 'jugando';
  alfabeto = 'abcdefghijklmnñopqrstuvwxyz';
  letras = this.alfabeto.split('');
  equivalencias: { [key: string]: string[] } = {
    'a': ['a', 'á', 'à', 'â', 'ä'],
    'e': ['e', 'é', 'è', 'ê', 'ë'],
    'i': ['i', 'í', 'ì', 'î', 'ï'],
    'o': ['o', 'ó', 'ò', 'ô', 'ö'],
    'u': ['u', 'ú', 'ù', 'û', 'ü'],
    'c': ['c', 'ç']
  };
  palabra = '';
  letrasExistentes: string[] = [];
  letrasElegidas: string[] = [];
  letrasFaltantes = 0;

  constructor(private http :HttpClient, private router :Router, public db :DbService) {}

  ngOnInit() {
    this.comenzar = false;
  }

  /**
   * 
   */
  nuevoJuego() {
    this.comenzar = true;
    this.ronda = 1;
    this.puntaje = 0;
    this.nuevaRonda();
  }

  /**
   * 
   */
  nuevaRonda() {

    this.estado = 'jugando';

    this.susbcripcion = this.http.get<string[]>('https://random-word-api.herokuapp.com/word?lang=es')
    .subscribe({
      next: res => {

        this.palabra = res[0].toLowerCase();
        this.letrasExistentes = this.palabra.split('');

        this.vidas = 6;              
        this.letrasElegidas = [];
        this.letrasFaltantes = this.letrasExistentes.filter( letra => letra !== ' ' && letra !== '-' ).length;

      },
      error: err => {
        console.error('Error al obtener palabra:', err);
      }

    });
    
  }  

  /**
   * 
   * @param letra 
   */
  elegirLetra(letra: string) {    

    if (this.estado !== 'jugando') return;

    // Se contrasta con las variantes del diccionario
    const variantes = this.equivalencias[letra] || [letra];

    // se guarda la letra en "elegidas"
    this.letrasElegidas.push(...variantes.filter(v => !this.letrasElegidas.includes(v)));

    // Mapea y filtra el indice de las letras recibidas enntre las letras existentes de la palabra
    const indexes = this.letrasExistentes
      .map((le, ind) => (variantes.includes(le) ? ind : -1))
      .filter(ind => ind !== -1);

    // Si el array filtrado tiene elementos entonces hubo match, se quita la letra de las remanentes
    if (indexes.length > 0) {
      this.coloresBotones[letra] = 'verde';
      this.letrasFaltantes -= indexes.length;

      if (this.letrasFaltantes === 0) 
        setTimeout(() => { this.finRonda(true); }, 2000);

    } 
    // Si el array no tiene elementos pierde una vida, si no quedan vidas se termina la ronda
    else {

      this.coloresBotones[letra] = 'rojo';
      this.vidas--;

      if(this.vidas == 0) {
        this.estado = 'pausa';
        setTimeout(() =>  { this.finRonda(false); }, 2000);
      }

    }

  }

  /**
   * 
   * @param puntos 
   */
  finRonda(puntos :Boolean) {

    if(puntos) {
      this.puntaje += 20;
      Swal.fire({
        title: "🎉 Ganaste la ronda!",
        text: `20 Puntos por acertar! La palabra era: ${this.palabra}, quedan ${this.maxRondas - this.ronda} rondas.`,
        icon: "success"
      });
    }
    else {
      Swal.fire({
        title: "💀 Perdiste la ronda",
        text: `Sin puntos esta vez! La palabra era: ${this.palabra}, quedan ${this.maxRondas - this.ronda} rondas.`,
        icon: "error"
      });
    }    

    if(this.ronda < this.maxRondas) {
      this.ronda++;
      this.nuevaRonda();
    }
    else
      this.gameOver();

  }

  /**
   * 
   */
  gameOver() {

    this.db.guardarResultadosJuegos(this.usuarioLogeado!.ID, this.usuarioLogeado!.NOMBRE, 1, this.puntaje);

    Swal.fire({
      title: "🍄 Se acabó!",
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

