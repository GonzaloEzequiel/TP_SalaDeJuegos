import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DbService } from './servicios/db/db';

@Component({
  selector: 'app-root',
  imports: [   
    RouterOutlet, 
    FormsModule
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  constructor(public db :DbService) {}
  
}
