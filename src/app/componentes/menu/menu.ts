import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { UserData } from '../../models/user-data';
import { NgIf } from '@angular/common';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-menu',
  standalone: true,
  imports : [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class Menu {

  userdata: UserData | null = null;
  tituloApp = 'Sala de Juegos';
  isMenuOpen = false;
  isLoggedUser = false;
  isLoading = true;

  @Output() usuarioLogeo = new EventEmitter<UserData>();

  constructor(private router :Router) {}
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async ngOnInit() {
    this.userdata = await this.consultarUsuario();
    this.usuarioLogeo.emit(this.userdata!);
    this.isLoading = false;
  }

  /**
   * Lectura de la información del usuario logeado
   */ 
  async consultarUsuario() { 
    try { 

      const { data: { user }, error: userError } = await supabase.auth.getUser(); 
      if (userError || !user) { 
        console.error('No hay usuario logeado');
        return null; 
      } 

      const { data, error } = await supabase.from('USUARIOS')
      .select('*')
      .eq('ID', user.id)
      .single(); 
      if (error) { 
        console.error("Error: ", error.message); 
        return null; 
      }

      this.userdata = data;

      if(this.userdata) {

        // se carga el avatar del usuario o se le asigna uno por defecto
        if(this.userdata.AVATAR_URL !== "")
          this.userdata.AVATAR_URL = this.consultarAvatar(data.AVATAR_URL);
        else
          this.userdata.AVATAR_URL = "https://cdn-icons-png.freepik.com/512/6596/6596121.png";
      } 
      
      this.isLoggedUser = true;
      return this.userdata; 
    
    } catch (e) { 
      console.error('Error inesperado:', e); 
      return null; 
    } 
  }

  /**
   * Lectura del avatar del usuario logeado
   * @param avatarUrl información del avatar
   * @returns avatar
   */
  consultarAvatar(avatarUrl :string) {
    return supabase.storage.from('images').getPublicUrl(avatarUrl).data.publicUrl;
  }

  /**
   * Desloguea al usuario, comunicandose con el menú
   */
  deslogearUsuario() {
    this.userdata = null;
    this.isLoggedUser = false;
    supabase.auth.signOut()
      .then(() => this.router.navigate(['/home']));
  }

}
