import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { RouterLink, RouterLinkActive } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-menu',
  imports : [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})

export class Menu {

}
