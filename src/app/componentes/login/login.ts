import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public email = "";
  public password = "";

  constructor(private router :Router, private snackBar :MatSnackBar) {}

  /**
   * Valida y Loegea al usuario, y redirige al home
   */
  login() {

    supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password
    })
    .then(({data, error}) => {

      if(error) {
        this.snackBar.open("Credenciales Incorrectas", "Cerrar", {
          duration: 5000
        });
      }
      else {
        supabase.from('LOGIN').insert([{
          ID_USUARIO: data.user.id
        }]);
        this.router.navigate(['/home']);
      }

    });
    
  }

  /**
   * Completa los campos de usuario con datos válidos
   */
  completar() {
        
    this.email = "augusto@unt.com";
    this.password = "AccesoRapido_1234";

  }

  registrarLogin() {

    

  }

}
