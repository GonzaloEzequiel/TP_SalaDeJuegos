import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray,} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { DbService } from '../../servicios/db/db';
import { UserData } from '../../models/user-data';
import { Menu } from "../menu/menu";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  imports: [Menu, ReactiveFormsModule, NgIf],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.scss'
})
export class Encuesta {

  usuarioLogeado :UserData | null = null;
  formEncuesta!:FormGroup;
  repiteClave :string ="";

  constructor(private router :Router, public db :DbService) {}

  ngOnInit() {

    this.formEncuesta  = new FormGroup({
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),         
      apellido: new FormControl("", [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),         
      edad: new FormControl("", [Validators.min(18), Validators.max(99), Validators.required]),    
      telefono: new FormControl("", [Validators.pattern('^[0-9]+$'), Validators.maxLength(10), Validators.required]),
      visita: new FormControl("", Validators.required),
      juegos: new FormArray([], Validators.required),
      mejora: new FormControl("", Validators.required)
    });

  }

  get nombre() { return this.formEncuesta.get('nombre'); }
  get apellido() { return this.formEncuesta.get('apellido'); }
  get edad() { return this.formEncuesta.get('edad'); }
  get telefono() { return this.formEncuesta.get('telefono'); }
  get visita() { return this.formEncuesta.get("visita"); }
  get juegos() { return this.formEncuesta.get("juegos"); }
  get mejora() { return this.formEncuesta.get("mejora"); }

  enviarForm() {

    if (this.formEncuesta.invalid) {
    this.formEncuesta.markAllAsTouched();
    Swal.fire({
      title: 'Campos incompletos ❌',
      text: 'Por favor completá todos los campos obligatorios antes de enviar.',
      icon: 'warning'
    });
    return;
  }

    this.db.client.from('RESULTADOS_ENCUESTA').insert({
      ID_USUARIO: this.usuarioLogeado?.ID,
      NOMBRE_USUARIO: this.nombre!.value,
      APELLIDO_USUARIO: this.apellido!.value,
      EDAD_USUARIO: this.edad!.value,
      TELEFONO_USUARIO: this.telefono!.value,
      RESPUESTA_VISITA: this.visita!.value,
      RESPUESTA_JUEGO: this.juegos!.value,
      RESPUESTA_MEJORA: this.mejora!.value
    })
    .then(({data, error}) => {
      if(error) {
        console.error("Error: ", error);
        Swal.fire({
          title: 'Error ❌',
          text: 'Error al enviar los datos.',
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Formulario enviado ✅',
          text: 'Tu respuesta ha sido registrada',
          icon: 'success'
        });
        this.formEncuesta.reset();
      }
    });
      
  }

  onCheckboxChange(event: any) {
    const juegosArray = this.juegos as FormArray;
    if (event.target.checked) {
      juegosArray.push(new FormControl(event.target.value));
    } else {
      const index = juegosArray.controls.findIndex(x => x.value === event.target.value);
      juegosArray.removeAt(index);
    }
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