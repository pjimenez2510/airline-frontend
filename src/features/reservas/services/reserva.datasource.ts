import AxiosClient from "@/core/infrastructure/http/axios-client";
import { Reserva } from "../interfaces/reserva.interface";

interface IReservaService {
  reservaPorVuelo(idVuelo: string): Promise<Reserva[]>;
  reservaPorUsuario(idUsuario: string): Promise<Reserva[]>;
  cancelarReserva(idReserva: string, idUsuario): Promise<void>;
}

export class ReservaService implements IReservaService {
  private url: string = "/ReservaService.svc/rest";
  private axiosCLient: AxiosClient;
  private static instance: ReservaService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }
  cancelarReserva(idReserva: string, idUsuario: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async reservaPorUsuario(idUsuario: string): Promise<Reserva[]> {
    const { data } = await this.axiosCLient.get<Reserva[]>(
      `${this.url}/usuarios/${idUsuario}/reservas`
    );
    return data.Data;
  }

  async reservaPorVuelo(idVuelo: string): Promise<Reserva[]> {
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
