import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { JuegosModuleRoutingModule } from "../../modulos/juegos/juegos-routing-module";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Menu, JuegosModuleRoutingModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  

}
