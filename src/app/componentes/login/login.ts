import { Component } from '@angular/core';
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
      else
        this.router.navigate(['/home']);

    });
    
  }

  async completar() {
        
    const {data, error} = await supabase.from('USUARIOS').select('EMAIL').limit(1).single();
    
    if (error) {
      console.error('Error obteniendo usuario:', error.message);
    }

  }

}
