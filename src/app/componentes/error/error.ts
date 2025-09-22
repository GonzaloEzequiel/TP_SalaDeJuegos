import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss'
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
