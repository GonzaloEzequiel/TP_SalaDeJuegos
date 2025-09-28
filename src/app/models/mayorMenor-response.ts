export interface MazoRespuesta {
  exito: boolean;
  idMazo: string;
  cantCartas: number;
  mezclado: boolean;
}

export interface RobarRespuesta {
  exito: boolean;
  idMazo: string;
  cartas: CartaRespuesta[];
  cantCartas: number;
}

export interface CartaRespuesta {
  codigo: string;
  imagen: string;
  imagenes: {
    svg: string;
    png: string;
  };
  valor: string;
  palo: string;
}