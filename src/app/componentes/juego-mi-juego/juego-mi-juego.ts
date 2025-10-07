// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';













// DESDE ACA


import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

interface Obstaculo {
  x: number;
  y: number;
  an: number;
  al: number;
  vel: number;
}



// HASTA ACA














@Component({
  standalone: false,
  selector: 'app-juego-mi-juego',
  templateUrl: './juego-mi-juego.html',
  styleUrl: './juego-mi-juego.scss'
})
export class JuegoMiJuego {

  // comenzar :boolean = false;

  usuarioLogeado :UserData | null = null;

  // vidas :number = 3;
  // puntaje :number = 0;

  // constructor(private router :Router) {}

  ngOnInit() {
    this.comenzar = false;
  }

  nuevoJuego() {    
    this.puntaje = 0;
    this.comenzar = true;
  }

  /**
   * Recibe información del usuario logeado en del componente menú
   * @param user data del usuario
   */
  onUsuarioLogeado(user :UserData) {
    
    if(!user) {
      console.error("Usuario no logeado");
      this.router.navigate(['/error']);
      return;
    }
    
    this.usuarioLogeado = user;

  }










  
















  // VERIFICAR -> CORREGIR -> PERSONALIZAR -> LIMPIAR

    @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
      private ctx!: CanvasRenderingContext2D | null;
      private rafId: number | null = null;

      // Canvas size
      // private width = 900;
      // private height = 200;
      
      // Display
      displayAncho :number = 900;
      displayAlto :number = 200;

      // // Player
      // playerX = 50;
      // playerY = 0;
      // private playerW = 44;
      // private playerH = 44;
      // private playerVy = 0;
      // private gravity = 0.9;
      // private jumpStrength = -14;
      // private groundY = 0;
      // private isOnGround = true;

      // Jugador
      jugPosEjeX :number = 50;
      jugPosEjeY :number = 0;
      jugAncho :number = 45;
      jugAlto :number = 45;
      jugVy :number = 0;
      jugGravedad :number = 1;
      jugSalto :number = -14;
      jugPisoY :number = 0;
      jugEnSuelo :boolean = true;




      // // Obstacles
      // obstacles: Obstacle[] = [];
      // private obstacleSpawnTimer = 0;
      // private obstacleSpawnInterval = 90; // frames (approx)
      // private baseSpeed = 6;
      // private speedIncrease = 0.0015; // speed up over time


      // Obstaculos
      obstaculos :Obstaculo[] = [];
      obsFrecuencia = 0;
      obsIntervalo = 90;
      obsVelBase = 6;
      obsAceleracion = 0.001;






      // // Game state
      // private frames = 0;
      // running = false;
      // gameOver = false;
      // score = 0;
      // highScore = 0;

      // Juego
      frames = 0;
      comenzar :boolean = false;
      gameover :boolean = false;
      vidas :number = 3;
      puntaje :number = 0;
      maxPuntaje :number = 0;
      




      // constructor(private router :Router) {
      //   this.playerY = 0;
      // }

      constructor(private router :Router) {
        this.jugPosEjeY = 0;
      }



    }   

//       // ngAfterViewInit(): void {
//       //   const canvas = this.canvasRef.nativeElement;
//       //   this.ctx = canvas.getContext('2d');
//       //   this.resizeCanvas();
//       //   this.reset();
//       //   this.loadHighScore();
//       //   // Start paused; user must start (click or press space)
//       // }


//       ngAfterViewInit() {
//         const canvas = this.canvasRef.nativeElement;
//         this.ctx = canvas.getContext('2d');
//         this.resizeCanvas();
//         this.reset();
//         this.loadHighScore();
//       }





//       ngOnDestroy(): void {
//         if (this.rafId) cancelAnimationFrame(this.rafId);
//       }

//       private resizeCanvas() {
//         const canvas = this.canvasRef.nativeElement;
//         // Fix pixel ratio for crisp canvas
//         const dpr = window.devicePixelRatio || 1;
//         canvas.width = this.width * dpr;
//         canvas.height = this.height * dpr;
//         canvas.style.width = `${this.width}px`;
//         canvas.style.height = `${this.height}px`;
//         const ctx = canvas.getContext('2d');
//         if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       }

//       start() {
//         if (this.running) return;
//         this.running = true;
//         this.gameOver = false;
//         this.frames = 0;
//         this.score = 0;
//         this.obstacles = [];
//         this.playerVy = 0;
//         this.isOnGround = true;
//         this.baseSpeed = 6;
//         this.loop();
//       }

//       reset() {
//         this.running = false;
//         this.gameOver = false;
//         this.obstacles = [];
//         this.playerY = 0;
//         this.playerVy = 0;
//         this.score = 0;
//         this.frames = 0;
//         this.obstacleSpawnTimer = 0;
//         this.draw(); // initial draw
//       }

//       private loop = () => {
//         this.update();
//         this.draw();
//         this.rafId = requestAnimationFrame(this.loop);
//       };

//       private update() {
//         if (!this.running) return;
//         this.frames++;
//         // increase difficulty slowly
//         const speed = this.baseSpeed + this.frames * this.speedIncrease;

//         // Player physics
//         if (!this.isOnGround) {
//           this.playerVy += this.gravity;
//           this.playerY += this.playerVy;
//           if (this.playerY >= 0) {
//             this.playerY = 0;
//             this.playerVy = 0;
//             this.isOnGround = true;
//           }
//         }

//         // Spawn obstacles
//         this.obstacleSpawnTimer++;
//         const spawnInterval = Math.max(45, this.obstacleSpawnInterval - Math.floor(this.frames / 600)); // faster later
//         if (this.obstacleSpawnTimer > spawnInterval) {
//           this.obstacleSpawnTimer = 0;
//           const h = 20 + Math.random() * 35;
//           const w = 12 + Math.random() * 30;
//           const obstacle: Obstacle = {
//             x: this.width + 20,
//             y: this.height - h - 20,
//             w,
//             h,
//             speed,
//           };
//           this.obstacles.push(obstacle);
//         }

//         // Move obstacles & prune
//         for (let i = this.obstacles.length - 1; i >= 0; i--) {
//           const ob = this.obstacles[i];
//           ob.x -= ob.speed;
//           // Collision
//           if (this.checkCollision(ob)) {
//             this.endGame();
//           }
//           if (ob.x + ob.w < -50) this.obstacles.splice(i, 1);
//         }

//         // Score increases with time
//         this.score = Math.floor(this.frames / 5);
//         if (this.score > this.highScore) this.highScore = this.score;
//       }

//       private checkCollision(ob: Obstacle) {
//         const playerTop = this.height - 20 - this.playerH - this.playerY;
//         const playerLeft = this.playerX;
//         const playerRight = playerLeft + this.playerW;
//         const playerBottom = playerTop + this.playerH;

//         const obLeft = ob.x;
//         const obRight = ob.x + ob.w;
//         const obTop = ob.y;
//         const obBottom = ob.y + ob.h;

//         // AABB collision
//         return !(playerRight < obLeft || playerLeft > obRight || playerBottom < obTop || playerTop > obBottom);
//       }

//       private endGame() {
//         this.running = false;
//         this.gameOver = true;
//         this.saveHighScore();
//         // keep rendering to show final frame; don't cancel RAF
//       }

//       jump() {
//         if (!this.running) {
//           // If not running, start on first jump
//           this.start();
//         }
//         if (this.isOnGround && !this.gameOver) {
//           this.playerVy = this.jumpStrength;
//           this.isOnGround = false;
//         }
//       }

//       // Controls
//       @HostListener('window:keydown', ['$event'])
//       handleKey(event: KeyboardEvent) {
//         if (event.code === 'Space' || event.code === 'ArrowUp') {
//           event.preventDefault();
//           if (this.gameOver) {
//             this.reset();
//             this.start();
//           } else {
//             this.jump();
//           }
//         } else if (event.code === 'KeyP') {
//           // toggle pause
//           this.running = !this.running;
//           if (this.running) this.loop();
//         }
//       }

//       onTap() {
//         if (this.gameOver) {
//           this.reset();
//           this.start();
//         } else {
//           this.jump();
//         }
//       }

//       private draw() {
//         if (!this.ctx) return;
//         const ctx = this.ctx;
//         // clear
//         ctx.clearRect(0, 0, this.width, this.height);

//         // background
//         ctx.fillStyle = '#f7f7f7';
//         ctx.fillRect(0, 0, this.width, this.height);

//         // ground
//         const groundY = this.height - 20;
//         ctx.fillStyle = '#222';
//         ctx.fillRect(0, groundY, this.width, 4);

//         // draw player (simple dinosaur silhouette)
//         const px = this.playerX;
//         const py = groundY - this.playerH - this.playerY;
//         // body
//         ctx.fillStyle = '#333';
//         roundRect(ctx, px, py, this.playerW, this.playerH, 6, true, false);
//         // eye
//         ctx.fillStyle = '#fff';
//         ctx.fillRect(px + this.playerW - 12, py + 8, 6, 6);

//         // obstacles
//         ctx.fillStyle = '#555';
//         for (const ob of this.obstacles) {
//           ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
//         }

//         // score panel
//         ctx.fillStyle = '#111';
//         ctx.font = '16px system-ui, Arial';
//         ctx.textAlign = 'right';
//         ctx.fillText(`Score: ${this.score}`, this.width - 12, 24);
//         ctx.fillText(`High: ${this.highScore}`, this.width - 12, 44);

//         // helpful text when stopped
//         if (!this.running && !this.gameOver) {
//           ctx.fillStyle = 'rgba(0,0,0,0.6)';
//           ctx.textAlign = 'center';
//           ctx.font = '18px system-ui, Arial';
//           ctx.fillText('Presiona ESPACIO o toca la pantalla para jugar', this.width / 2, this.height / 2 - 10);
//           ctx.font = '12px system-ui, Arial';
//           ctx.fillText('P para pausar/reanudar', this.width / 2, this.height / 2 + 12);
//         }

//         if (this.gameOver) {
//           ctx.fillStyle = 'rgba(0,0,0,0.7)';
//           ctx.fillRect(this.width / 2 - 160, this.height / 2 - 36, 320, 72);
//           ctx.fillStyle = '#fff';
//           ctx.textAlign = 'center';
//           ctx.font = '20px system-ui, Arial';
//           ctx.fillText('Game Over', this.width / 2, this.height / 2 - 2);
//           ctx.font = '14px system-ui, Arial';
//           ctx.fillText('Presiona ESPACIO o toca para reiniciar', this.width / 2, this.height / 2 + 18);
//         }
//       }

//       private saveHighScore() {
//         try {
//           const prev = Number(localStorage.getItem('dino_highscore') || '0');
//           if (this.highScore > prev) {
//             localStorage.setItem('dino_highscore', String(this.highScore));
//           }
//         } catch (e) {
//           // ignore
//         }
//       }

//       private loadHighScore() {
//         try {
//           const hs = Number(localStorage.getItem('dino_highscore') || '0');
//           this.highScore = hs;
//         } catch (e) {
//           this.highScore = 0;
//         }
//       }      
  
  
// }


// // helper: rounded rect
// function roundRect(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   w: number,
//   h: number,
//   r: number,
//   fill: boolean,
//   stroke: boolean
// ) {
//   if (typeof r === 'undefined') r = 5;
//   if (typeof r === 'number') {
//     r = Math.min(r, w / 2, h / 2);
//   }
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.arcTo(x + w, y, x + w, y + h, r);
//   ctx.arcTo(x + w, y + h, x, y + h, r);
//   ctx.arcTo(x, y + h, x, y, r);
//   ctx.arcTo(x, y, x + w, y, r);
//   ctx.closePath();
//   if (fill) ctx.fill();
//   if (stroke) ctx.stroke();
// }



// VERIFICAR -> CORREGIR -> PERSONALIZAR -> LIMPIAR