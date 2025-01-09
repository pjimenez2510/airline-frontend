import AxiosClient from "@/core/infrastructure/http/axios-client";
import { Reserva } from "../interfaces/reserva.interface";

interface IReservaService {
  reservasPorVuelo(idVuelo: string): Promise<Reserva[]>;
  reservasPorUsuario(idUsuario: string): Promise<Reserva[]>;
  reservaPorId(idReserva: string): Promise<Reserva>;
  cancelarReserva(idReserva: string, idUsuario: string): Promise<boolean>;
  crearReserva(
    idVuelo: string,
    idUsuario: string,
    numeroAsiento: string
  ): Promise<void>;
}

export class ReservaService implements IReservaService {
  private url: string = "/ReservaService.svc/rest";
  private axiosCLient: AxiosClient;
  private static instance: ReservaService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }
  async crearReserva(
    idVuelo: string,
    idUsuario: string,
    numeroAsiento: string
  ): Promise<void> {
    const { data } = await this.axiosCLient.post<void>(`${this.url}/reservas`, {
      numeroAsiento,
      vueloId: idVuelo,
      usuarioId: idUsuario,
    });
    if (!data.Success) {
      throw new Error(data.Message);
    }
  }

  async reservaPorId(idReserva: string): Promise<Reserva> {
    const { data } = await this.axiosCLient.get<Reserva>(
      `${this.url}/reservas/${idReserva}`
    );
    return data.Data;
  }

  async cancelarReserva(
    idReserva: string,
    idUsuario: string
  ): Promise<boolean> {
    const { data } = await this.axiosCLient.get<boolean>(
      `${this.url}/cancelar-reserva/${idReserva}`,
      { params: { usuarioId: idUsuario } }
    );
    return data.Data;
  }

  async reservasPorUsuario(idUsuario: string): Promise<Reserva[]> {
    const { data } = await this.axiosCLient.get<Reserva[]>(
      `${this.url}/usuarios/${idUsuario}/reservas`
    );
    return data.Data;
  }

  async reservasPorVuelo(idVuelo: string): Promise<Reserva[]> {
    const { data } = await this.axiosCLient.get<Reserva[]>(
      `${this.url}/vuelos/${idVuelo}/reservas`
    );
    return data.Data;
  }

  public static getInstance(): IReservaService {
    if (!ReservaService.instance) {
      ReservaService.instance = new ReservaService();
    }
    return ReservaService.instance;
  }
}
