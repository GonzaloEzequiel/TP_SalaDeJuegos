import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// Definimos una interfaz para los componentes con formularios
export interface FormularioConCambios {
  formEncuesta?: any; // Encuesta
  nombre?: string;    // Registro
  email?: string;
  password?: string;
  formGroup?: any;
}

@Injectable({
  providedIn: 'root'
})
export class incFormGuard implements CanDeactivate<FormularioConCambios> {

  canDeactivate(component: FormularioConCambios): Observable<boolean> | Promise<boolean> | boolean {

    // Caso 1: si el componente tiene un formEncuesta (Encuesta)
    if (component.formEncuesta) {
      const form = component.formEncuesta;
      if (form.dirty && !form.submitted) {
        return confirm('No completaste la encueta. ¿Deseas salir igualmente?');
      }
    }

    // Caso 2: si es el Registro (sin ReactiveForms)
    if ('nombre' in component && 'email' in component && 'password' in component) {
      const incompleto =
        !component.nombre ||
        !component.email ||
        !component.password;

      if (incompleto) {
        return confirm('El formulario de registro no está completo. ¿Seguro que quieres salir?');
      }
    }

    // Si no aplica ningún caso, se permite navegar
    return true;
  }
}