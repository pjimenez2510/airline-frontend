import AxiosClient from "@/core/infrastructure/http/axios-client";
import { Vuelo } from "../interfaces/vuelo.interface";

interface IVueloService {
  vuelosFuturos(): Promise<Vuelo[]>;
}

export class VueloService implements IVueloService {
  private url: string = "/VueloService.svc/rest";
  private axiosCLient: AxiosClient;
  private static instance: VueloService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
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
