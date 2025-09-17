import { Component } from '@angular/core';
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

   usersdata: UserData[] = [];

  // ngOnInit(): void {
  //   this.leerUsuario();
  // }

  // /**
  //  * Lectura de la información del usuario logeado
  //  */
  // leerUsuario() {
  //   supabase.from('users-data')
  //     .select('*')
  //     .then(({ data, error }) => {
  //       if (error) {
  //         console.error(`Error: ${error.message}`);
  //       } else {
  //         console.log(`Error: ${data}`);
  //         this.usersdata = data;
  //       }
  //     });
  // }

  // /**
  //  * Lectura del avatar del usuario logeado
  //  * @param avatarUrl información del avatar
  //  * @returns avatar
  //  */
  // leerAvatar(avatarUrl :string) {
  //   return supabase.storage.from('images').getPublicUrl(avatarUrl).data.publicUrl;
  // }

}
