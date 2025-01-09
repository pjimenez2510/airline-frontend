import AxiosClient from "@/core/infrastructure/http/axios-client";
import { Vuelo } from "../interfaces/vuelo.interface";

interface IVueloService {
  vuelosFuturos(): Promise<Vuelo[]>;
  getCiudadesDestino(): Promise<string[]>;
  getCiudadesOrigen(): Promise<string[]>;
  getVuelo(id: string): Promise<Vuelo>;
  buscarVuelos(
    origen: string,
    destino: string,
    fecha: string
  ): Promise<Vuelo[]>;
}

export class VueloService implements IVueloService {
  private url: string = "/VueloService.svc/rest";
  private axiosCLient: AxiosClient;
  private static instance: VueloService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }
  async getVuelo(id: string): Promise<Vuelo> {
    const { data } = await this.axiosCLient.get<Vuelo>(
      `${this.url}/vuelos/${id}`
    );
    return data.Data;
  }
  async buscarVuelos(
    origen: string,
    destino: string,
    fecha: string
  ): Promise<Vuelo[]> {
    const { data } = await this.axiosCLient.get<Vuelo[]>(`${this.url}/vuelos`, {
      params: {
        origen,
        destino,
        fecha,
      },
    });
    return data.Data;
  }
  async getCiudadesDestino(): Promise<string[]> {
    const { data } = await this.axiosCLient.get<string[]>(
      `${this.url}/ciudades/destino`
    );
    return data.Data;
  }
  async getCiudadesOrigen(): Promise<string[]> {
    const { data } = await this.axiosCLient.get<string[]>(
      `${this.url}/ciudades/origen`
    );
    return data.Data;
  }

  async vuelosFuturos(): Promise<Vuelo[]> {
    const { data } = await this.axiosCLient.get<Vuelo[]>(
      `${this.url}/vuelos-futuros`
    );
    return data.Data;
  }

  public static getInstance(): IVueloService {
    if (!VueloService.instance) {
      VueloService.instance = new VueloService();
    }
    return VueloService.instance;
  }
}
