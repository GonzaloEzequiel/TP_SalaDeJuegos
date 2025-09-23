import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioModuleRoutingModule } from './usuarios-routing-module';
import { FormsModule } from '@angular/forms';
import { Login } from '../../componentes/login/login';
import { Registro } from '../../componentes/registro/registro';
import { Menu } from '../../componentes/menu/menu';


@NgModule({
  declarations: [
    Login,
    Registro
  ],
  imports: [
    CommonModule,
    UsuarioModuleRoutingModule,
    FormsModule,
    Menu
  ],
  exports: [
    Login,
    Registro
  ]
})
export class UsuarioModule { }
