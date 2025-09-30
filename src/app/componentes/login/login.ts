import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Db } from '../../servicios/db';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public email = "";
  public password = "";

  constructor(private router :Router, public db :Db, private snackBar :MatSnackBar) {}

  /**
   * Valida y Loegea al usuario, y redirige al home
   */
  login() {

    this.db.client.auth.signInWithPassword({
      email: this.email,
      password: this.password
    })
    .then(async ({data, error}) => {

      if(error) {
        this.snackBar.open("Credenciales Incorrectas", "Cerrar", {
          duration: 5000
        });
      }
      else {

        try {
          // Se registra la fecha/hora y usuario que logea
          await this.db.client.from('LOGIN').insert([{ ID_USUARIO: data.session.user.id }]);
          this.router.navigate(['/home']);

        } catch(e) {
          console.error("Error insertando login:", e);
        }
        
      }

    });
    
  }

  /**
   * Completa los campos de usuario con datos válidos
   */
  completar() {
        
    this.email = "augusto@utn.com";
    this.password = "AccesoRapido_1234";

  }

}
