import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-juego-ahorcado',
  templateUrl: './juego-ahorcado.html',
  styleUrls: ['./juego-ahorcado.scss']
})
export class JuegoAhorcado {
  
  susbcripcion!: Subscription;
  estado: 'jugando' | 'ganaste' | 'perdiste' = 'jugando';
  alfabeto = 'abcdefghijklmnñopqrstuvwxyz';
  letras = this.alfabeto.split('');
  palabra = '';
  letrasExistentes: string[] = [];
  letrasElegidas: string[] = [];
  totalIncorrectas = 0;
  letrasFaltantes = 0;
  partesMunieco = [
    '<circle stroke-width="10" stroke-miterlimit="10" cx="254.404" cy="174.26" r="29.412"/>',
    '<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="203.672" x2="254.404" y2="314.056"/>',
    '<line stroke-width="10" stroke-miterlimit="10" x1="255.339" y1="311.094" x2="185.875" y2="406.468"/>',
    '<line stroke-width="10" stroke-miterlimit="10" x1="323.46" y1="406.468" x2="253.996" y2="311.094"/>',
    '<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="164.11" y2="256.834"/>',
    '<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="344.699" y2="256.834"/>',
    '<circle fill="#000000" cx="243.663" cy="169.333" r="3.667"/>',
    '<circle fill="#000000" cx="265.663" cy="169.333" r="3.667"/>',
    '<path stroke-width="4" stroke-miterlimit="10" d="M245.571,190.082c0-4.879,3.955-8.833,8.833-8.833 c4.879,0,8.833,3.955,8.833,8.833"/>'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.newPuzzle();
  }

  async newPuzzle() {
    this.susbcripcion = this.http.get<string[]>('https://random-word-api.herokuapp.com/word?lang=es')
    .subscribe(res => {
      this.palabra = res[0].toLowerCase();
      this.letrasExistentes = this.palabra.split('');
      this.letrasElegidas = [];
      this.totalIncorrectas = 0;
      this.letrasFaltantes = this.letrasExistentes.filter(
        l => l !== ' ' && l !== '-'
      ).length;
    });
  }

  elegirLetra(letra: string) {
    if (this.letrasElegidas.includes(letra)) return;

    this.letrasElegidas.push(letra);

    const indexes = this.letrasExistentes
      .map((l, i) => (l === letra ? i : -1))
      .filter(i => i !== -1);

    if (indexes.length > 0) {
      this.letrasFaltantes -= indexes.length;
      if (this.letrasFaltantes === 0) this.gameOver(true);
    } else {
      this.totalIncorrectas++;
      if (this.totalIncorrectas >= this.partesMunieco.length) {
        this.gameOver(false);
      }
    }
  }

  gameOver(won: boolean) {
    alert(won ? '🎉 Ganaste!' : `💀 Perdiste! La palabra era: ${this.palabra}`);
    this.newPuzzle();
  }

  ngOnDestroy() {
    this.susbcripcion.unsubscribe();
  }


}

