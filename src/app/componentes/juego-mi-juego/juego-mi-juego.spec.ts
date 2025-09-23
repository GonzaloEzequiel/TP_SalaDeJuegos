import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMiJuego } from './juego-mi-juego';

describe('JuegoMiJuego', () => {
  let component: JuegoMiJuego;
  let fixture: ComponentFixture<JuegoMiJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoMiJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoMiJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
