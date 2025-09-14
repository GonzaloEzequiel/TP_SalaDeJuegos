import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  //public static baseUrl = "http://localhost:3000";
  public email = "";
  public password = "";
  public mensaje = "";

  public arrayUsuarios = [
    {
      user: "gonzalo@utn.com",
      pass: "12345678"
    },
    {
      user: "florencia@utn.com",
      pass: "12341234"
    },
    {
      user: "augusto@utn.com",
      pass: "11223344"
    },
  ]

  constructor(private router: Router) {}

  async validar() {

    let validado = this.arrayUsuarios.find(usr => usr.user == this.email && usr.pass == this.password);

    if(validado)
    {
      console.log("login exitoso");
      let user = this.email.split("@")[0];
      let name = user.charAt(0).toUpperCase() + user.slice(1);

      this.mensaje = `Bienvenido ${name}`;
      
      this.router.navigate(['/home']);
      localStorage.setItem("user", name);
    }
    else {
      console.log("NO NO...");
    }
    // try {
    //   let respuesta = await fetch(`${Login.baseUrl}/api/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email: this.email,
    //       password: this.password
    //     })
    //   });

    //   if (respuesta.status === 404) {
    //     alert("Credenciales Incorrectas");
    //   } else if (respuesta.status === 200) {
    //     let resultado = await respuesta.json();
    //     sessionStorage.setItem("user", resultado.admin);
    //     window.location.href = `${Login.baseUrl}/home`;
    //   }
    // } catch (error) {
    //   console.log("Error al recibir respuesta del backend: ", error);
    // }

  }

  completar() {
    let index = Math.floor(Math.random() * this.arrayUsuarios.length);
    this.email = this.arrayUsuarios[index].user;
    this.password = this.arrayUsuarios[index].pass;
  }

  saludar() {
    return this.mensaje;
  }

}
