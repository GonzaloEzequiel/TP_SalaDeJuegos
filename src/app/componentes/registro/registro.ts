import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {

  nombre :string;
  edad :number;
  email :string;
  password :string;
  password2 :string;
  avatar :File | null = null;

  constructor(private router :Router, private snackBar :MatSnackBar) {
    this.nombre = "";
    this.edad = 0;
    this.email = "";
    this.password = "";
    this.password2 = "";
  }

  /**
   * Proceso de registro contra "auth.usuarios" de supabase
   */
  registro() {
    if(this.validarDatos()) {

      supabase.auth.signUp({
        email: this.email,
        password: this.password
      })
      .then(({data, error}) => {

        if(error) {

          if (error.message.includes('already registered') || error.message.includes('already exists')) {
            this.snackBar.open('El correo ya está registrado. Intenta con otro.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else {
            this.snackBar.open(`Error: ${error.message}`, 'Cerrar', { duration: 5000 });
          }
        }
        else {
          console.log(`Usuario Registado: ${data.user}`);
          this.insertarUsuario(data.user!);
          this.router.navigate(['/home']);
        }

      });

    } else {
      this.snackBar.open("Datos Incorrectos", "Cerrar", { duration: 5000 });
    }
  }

  /**
   * Persistencia de la información del usuario en "public.USUARIOS"
   * @param user objeto usuario en "auth.usuarios"
   */
  insertarUsuario(user :User) {

    const avatarUrl = this.guardarArchivo()
    .then(data => {

      if(data) {        
        supabase.from('USUARIOS').insert([{
          ID: user.id,
          NOMBRE: this.nombre,
          EDAD: this.edad,
          AVATAR_URL: data.path
        }])
        .then(({data, error}) => {
          if(error)
            console.error(`Error: ${error.message}`);
          else {
            supabase.from('LOGIN').insert([{
              ID_USUARIO: user.id
            }]);
            this.router.navigate(['/home']);
          }
        })
      }

    })

  }

  /**
   * Registra el avatar del usuario en el Bucket de supabase
   * @returns la información respectiva de la imagen
   */
  async guardarArchivo() {

    if (!this.avatar)
      return { path: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png" };

    const {data, error} = await supabase
      .storage
      .from('images')
      .upload(`users/${this.avatar?.name}`, this.avatar!, {
        cacheControl: '3600',
        upsert: false
      });

    return data;
  }

  /**
   * Valida los datos ingrasado por el usuario en el formulario de registro
   * @returns un booleano con el resultado del análisis de posibles errores
   */
  validarDatos() {
    return  this.nombre != "" &&
            this.edad > 0 &&
            this.email != "" &&
            this.password != "" &&
            this.password === this.password2;
  }

  onFileSelected(event :any) {
    this.avatar = event.target.files[0];
  }

}
