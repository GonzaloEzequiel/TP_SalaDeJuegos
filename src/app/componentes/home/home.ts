import { Component, Input } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { UserData } from '../../models/user-data';
import { environment } from '../../../environments/environment';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  @Input() userdata: UserData[] = [];

  ngOnInit(): void {
    this.consultarUsuario();
  }

  /**
   * Lectura de la información del usuario logeado
   */
  consultarUsuario() {
    supabase.from('USUARIOS')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.log(`Error: ${data}`);
          this.userdata = data;
        }
      });

    return this.userdata;
  }

  /**
   * Lectura del avatar del usuario logeado
   * @param avatarUrl información del avatar
   * @returns avatar
   */
  consultarAvatar(avatarUrl :string) {
    return supabase.storage.from('images').getPublicUrl(avatarUrl).data.publicUrl;
  }

}
