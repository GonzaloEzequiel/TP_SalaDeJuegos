import { Injectable } from '@angular/core';
import { DbService } from '../db/db';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {

  private loggedIn = false;
  private admin = false;

  constructor(private db :DbService) { }

  login(isAdmin :boolean = false) {
    this.loggedIn = true;
    this.admin = isAdmin;
  }

  logout() {
    this.loggedIn = false;
    this.admin = false;
  }


  async consultarUsuario() {
    const { data: { user }, error: userError } = await this.db.client.auth.getUser();

    if (userError || !user) {
      this.loggedIn = false;
      return;
    }

    const { data, error } = await this.db.client
      .from('USUARIOS')
      .select('*')
      .eq('ID', user.id)
      .single();
      
    this.loggedIn = !!data && !error; 

    if(
      user.email! === 'gonzalo@utn.com' ||
      user.email! === 'augusto@utn.com' ||
      user.email! === 'esteban@utn.com' 
    ) {
      this.admin = true;
    }

  }

  async isLoggedIn() {

    await this.consultarUsuario();
    return this.loggedIn;

  }

  async isAdmin() {
    await this.consultarUsuario();
    return this.loggedIn && this.admin;
  }
  
}


