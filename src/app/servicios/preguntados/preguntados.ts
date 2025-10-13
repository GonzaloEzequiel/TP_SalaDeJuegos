import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  baseUrl :string = 'https://rickandmortyapi.com/api/character/';
  totalPersonajes :number = 0;

  constructor(private http :HttpClient) {

    this.http.get<any>(this.baseUrl)
      .subscribe(res => {
        this.totalPersonajes = res.info.count;
      });

  }
  
  getPersonajesNuevaRonda() :Observable<any> {

    let ruletaA = Math.floor(Math.random() * this.totalPersonajes) +1;
    let ruletaB = Math.floor(Math.random() * this.totalPersonajes) +1;
    let ruletaC = Math.floor(Math.random() * this.totalPersonajes) +1;
    let ruletaD = Math.floor(Math.random() * this.totalPersonajes) +1;    

    return this.http.get<any>(`${this.baseUrl}/${ruletaA},${ruletaB},${ruletaC},${ruletaD}`);

  }

}
