import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Db } from '../../servicios/db';

@Component({
  selector: 'app-registro',
  standalone: false,
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

  constructor(private router :Router, public db :Db, private snackBar :MatSnackBar) {
    this.nombre = "";
    this.edad = 0;
    this.email = "";
    this.password = "";
    this.password2 = "";
  }

  /**
   * Proceso de registro contra "auth.usuarios" de supabase
   */
  async registro() {
    if(this.validarDatos()) {

      const { data, error } = await this.db.client.auth.signUp({
        email: this.email,
        password: this.password
      });

      if(error) {      

        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          this.snackBar.open('El correo ya está registrado. Intenta con otro.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

        }
        else
        if(error.message.includes('Password should be at least 6 characters')) {
          this.snackBar.open('La contraseña debe tener al menos 6 caracteres.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
        else
        if(error.message.includes('User already registered')) {
          this.snackBar.open('El usuario (correo) ya se encuentra registrado.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

        } else {
          this.snackBar.open(`Error: ${error.message}`, 'Cerrar', { duration: 5000 });
        }

        return;
      }

      const user = data.user;
      const session = data.session;

      if(user)
        this.insertarUsuario(user)

      if(session) {
        this.snackBar.open("Registro exitoso. Bienvenido!", "Cerrar", { duration: 5000 });
        this.router.navigate(['/home']);
      }

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
        this.db.client.from('USUARIOS').insert({
          ID: user.id,
          EMAIL: this.email,
          NOMBRE: this.nombre,
          EDAD: this.edad,
          AVATAR_URL: data.path
        })
        .then(({data, error}) => {
          if(error)
            console.error(`Error: ${error.message}`);
          else {
            this.db.client.from('LOGIN').insert([{
              ID_USUARIO: user.id
            }]);
            this.router.navigate(['/home']);
          }
        });
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

    const {data, error} = await this.db.client
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
            (this.edad > 18 && this.edad < 99) &&
            this.email != "" &&
            this.password != "" &&
            this.password === this.password2;
  }

  onFileSelected(event :any) {
    this.avatar = event.target.files[0];
  }

}
