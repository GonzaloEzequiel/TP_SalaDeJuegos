import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Db } from './servicios/db';

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

  constructor(public db :Db) {}
  
}
