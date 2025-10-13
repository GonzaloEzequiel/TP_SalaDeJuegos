import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path : 'login',
    loadComponent : () => import('../../componentes/login/login').then(c => c.Login)
  },  
  {
    path : 'registro',
    loadComponent : () => import('../../componentes/registro/registro').then(c => c.Registro),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioModuleRoutingModule { }
