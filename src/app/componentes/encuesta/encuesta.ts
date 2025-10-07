import { Component } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  imports: [],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.scss'
})
export class Encuesta {

  form! = new FormGroup()

  ngOnInig() {

    this.form  = new FormGroup({
      usuario: new FormControl("", {
        asyncValidators: this.usuarioExistenteAsyncValidator(this.usuariosService),  // validación custom contra una BBDD por medio de una API 
        updateOn: 'blur'                                                        // cuando se quita el foco del input   [ change || submit || undefined ]
      }),
      // primer parámetro: valor "inicial", segundo parámetro: validadores
      nombre: new FormControl("", Validators.pattern('^[a-zA-Z]+$')),         // validador de contenido (patrón de expresión regular)
      edad: new FormControl("", [Validators.min(18), Validators.max(99)]),    // (array de) validadores de valor mínimo y máximo
      mail: new FormControl("", Validators.email),                            // validador de estructura de correo electronico
      clave: new FormControl("", Validators.minLength(4)),                    // validador de cantidad de caracteres
      repiteClave: new FormControl(null, Validators.required)                 // validador de campo requerido
    }, 
    confirmarClaveValidator(); 

  }



  usuarioExisteAsyncValidator(service: UsuariosService) :AsyncValidatorFn {
    return (control: AbstractControl) => {                        // form control del usuario
      const usuario = control.value;
      return service.TraerUsuarios(usuario)
        .pipe(				                                            // el operador pipe permite "hacer algo" antes que el valor llegue a la suscripción
          map(usuarios => {
            if(usuarios.length > 0)
              return { usuarioExiste: "El usuario ya existe" };   // validation error
            return null;
          })			
        );
    };
  }

  confirmarClaveValidator() :ValidatorFn {
    return (formGroup: AbstractControl) :ValidationErrors | null => {
      const clave = formGroup.get('clave');                                         // el metodo get devuelve el AbstractControl con el nombre del string del parámetro (o null)
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
  
}