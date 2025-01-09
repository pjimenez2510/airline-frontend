import { Vuelo } from "./vuelo.interface";

export interface Reserva {
  Estado: string;
  FechaReserva: string;
  NumeroAsiento: string;
  PrecioTotal: number;
  ReservaId: number;
  UsuarioId: number;
  Vuelo: Vuelo;
  VueloId: number;
}
