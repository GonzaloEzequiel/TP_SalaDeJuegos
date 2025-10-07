import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserData } from '../../models/user-data';
import { ChatMensaje } from '../../models/mensaje-data';
import { Menu } from "../menu/menu";
import { Db } from '../../servicios/db';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  imports: [Menu, FormsModule, DatePipe]
})
export class Chat {

  usuarioLogeado :UserData | null = null;
  
  nuevoMensaje :string = '';
  mensajes: ChatMensaje[] = [];

  constructor(private router :Router, public db :Db) {}

  // Scroll automático al final del chat-box
  @ViewChild('mensajesContainer') private mensajesContainer!: ElementRef;
  scrollToBottom() {
    try {
      const el = this.mensajesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.warn('No se pudo hacer scroll:', err);
    }
  }  

  async ngOnInit() {    

    // Cargar mensajes existentes
    await this.cargarMensajes();

    console.log('[DEBUG] Iniciando suscripción realtime...');

     // Suscripción en tiempo real (canal Supabase)
    this.db.client.channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'MENSAJES_CHAT' },
      (payload) => {
        this.mensajes = [...this.mensajes, payload.new as ChatMensaje];
        setTimeout(() => this.scrollToBottom(), 50);
      }
    )
    .subscribe();
    
  }

  /**
   * Consulta en la base de datos los mensajes existentes
  */
  async cargarMensajes() {

    const { data, error } = await this.db.client
    .from('MENSAJES_CHAT')
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
    
    setTimeout(() => this.scrollToBottom(), 500);
  }

  async enviarMensaje() {

    if (!this.nuevoMensaje.trim()) return;

    const { data, error } = await this.db.client
      .from('MENSAJES_CHAT')
      .insert([{
        ID_USUARIO: this.usuarioLogeado?.ID,
        NOMBRE_USUARIO: this.usuarioLogeado?.NOMBRE,
        MENSAJE: this.nuevoMensaje,
      }]);

    if (error) {
      console.error("Error al enviar:", error.message);
    } else {    
      this.nuevoMensaje = '';
    }
  }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {

    this.usuarioLogeado = user;

    // Valida que haya un usuario logeado, sino lo redirecciona
    if(this.usuarioLogeado === null) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
    }

  }


  

}