import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [Menu],
  templateUrl: './error.html',
  styleUrls: ['./error.scss']
})
export class Error {

  protected contador :number;

  constructor(private router :Router) {
    this.contador = 5;
  }

  ngOnInit() {

    const interval = setInterval(() => {
      this.contador--;

      if (this.contador === 0) {
        clearInterval(interval);
        this.router.navigate(['/home']);
      }

    }, 1000);
    
  }
}
