import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UserData } from '../../models/user-data';
import { ChatMensaje } from '../../models/mensaje-data';
import { Menu } from "../menu/menu";

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-chatroom',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  imports: [Menu, DatePipe, FormsModule]
})
export class Chat {

  usuario :UserData | null = null;
  nuevoMensaje :string = '';
  mensajes: ChatMensaje[] = [];

  constructor(private router :Router) {}

  async ngOnInit() {    

    // Cargar mensajes existentes
    await this.cargarMensajes();

    // Suscripción en tiempo real (canal Supabase)
    supabase.channel('chat-room')
      .on<ChatMensaje>(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'CHATMENSAJES' },
      (payload) => {
        this.mensajes.push(payload.new as ChatMensaje);
      }
    )
    .subscribe();

  }

  /**
   * Consulta en la base de datos los mensajes existentes
   */
  async cargarMensajes() {

    const { data, error } = await supabase
      .from('CHATMENSAJES')
      .select('*')
      .order('CREATED_AT', { ascending: true });

    if (error) {
      console.error("Error al cargar mensajes:", error.message);
    } else {
      // convierte TimeStampz a Date
      this.mensajes = (data || []).map(msg => ({
        ...msg,
        FECHA_HORA: new Date(msg.CREATED_AT)
      }));
    }

  }

  async enviarMensaje() {

    if (!this.nuevoMensaje.trim()) return;

    const { data, error } = await supabase
      .from('CHATMENSAJES')
      .insert([{
        ID_USUARIO: this.usuario?.ID,
        NOMBRE_USUARIO: this.usuario?.NOMBRE,
        MENSAJE: this.nuevoMensaje,
      }]);

    if (error) {
      console.error("Error al enviar:", error.message);
    } else {
      this.nuevoMensaje = ''; // limpiar input
    }

  }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {

    this.usuario = user;

    // Valida que haya un usuario logeado, sino lo redirecciona
    if(this.usuario === null) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
    }

  }

}
