import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Db } from '../../servicios/db';
import { UserData } from '../../models/user-data';
import { Menu } from "../menu/menu";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  imports: [Menu],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.scss'
})
export class Encuesta {

  usuarioLogeado :UserData | null = null;

  form!:FormGroup;
  repiteClave :string ="";

  constructor(private router :Router, public db :Db) {}

  ngOnInit() {

    this.form  = new FormGroup({
      usuario: new FormControl("", Validators.pattern('^[a-zA-Z]+$')),           
      nombre: new FormControl("", Validators.pattern('^[a-zA-Z]+$')),         
      edad: new FormControl("", [Validators.min(18), Validators.max(99)]),    
      mail: new FormControl("", Validators.email),                            
      clave: new FormControl("", Validators.minLength(4)),                    
      repiteClave: new FormControl(null, Validators.required)                 
    })
    this.confirmarClaveValidator();

  }

  get usuario() { return this.form.get('usuario'); }
  get nombre() { return this.form.get('nombre'); }
  get edad() { return this.form.get('edad'); }
  get mail() { return this.form.get('mail'); }
  get clave() { return this.form.get('clave'); }
  get repiteClaveCtrl() { return this.form.get('repiteClave'); }
  
  confirmarClaveValidator() :ValidatorFn {
    return (formGroup: AbstractControl) :ValidationErrors | null => {
      const clave = formGroup.get('clave');                                         
      const repiteClave = formGroup.get('repiteClave');
      const respuestaError = { claveNoCoincide: "Las contraseñas no coinciden" };
      
      if(clave?.value !== repiteClave?.value) {
        formGroup.get('repiteClave')?.setErrors(respuestaError);
        return respuestaError;
      }
      else {
        formGroup.get('repiteClave')?.setErrors(null);
        return null;
      }		
    };
  }

  enviarForm() {
    console.log("TEST COMPLETAR");

    if (this.form.valid) {
    Swal.fire({
      title: 'Formulario enviado ✅',
      text: JSON.stringify(this.form.value, null, 2),
      icon: 'success'
    });
    } else {
      Swal.fire({
        title: 'Error ❌',
        text: 'Por favor, completá correctamente todos los campos.',
        icon: 'error'
      });
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