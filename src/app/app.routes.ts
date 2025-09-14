import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { QuienSoy } from './componentes/quien-soy/quien-soy';
import { Login } from './componentes/login/login';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/home',
        pathMatch : 'full'
    },
    {
        path : 'home',
        component : Home
    },
    {
        path : 'quiensoy',
        component : QuienSoy
    },
    {
        path : 'login',
        component : Login
    }

];
