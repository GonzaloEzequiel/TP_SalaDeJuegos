import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public static baseUrl = "http://localhost:3000";
  public email = "";
  public password = "";

  async validar() {

    console.log("TEST");

    try {
      let respuesta = await fetch(`${Login.baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      if (respuesta.status === 404) {
        alert("Credenciales Incorrectas");
      } else if (respuesta.status === 200) {
        let resultado = await respuesta.json();
        sessionStorage.setItem("user", resultado.admin);
        window.location.href = `${Login.baseUrl}/home`;
      }
    } catch (error) {
      console.log("Error al recibir respuesta del backend: ", error);
    }

  }

}
