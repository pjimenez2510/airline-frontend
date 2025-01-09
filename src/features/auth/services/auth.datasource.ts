import { User } from "@/features/users/interfaces/user.interface";
import { Login, Register } from "../interfaces/auth.interface";
import AxiosClient from "@/core/infrastructure/http/axios-client";

interface IAuthService {
  login(user: Login): Promise<User>;
  register(user: Register): Promise<User>;
}

export class AuthService implements IAuthService {
  private url: string = "/UsuarioService.svc/rest/usuarios";
  private axiosCLient: AxiosClient;
  private static instance: AuthService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }

  public static getInstance(): IAuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(user: Login): Promise<User> {
    const { data } = await this.axiosCLient.post<User>(
      `${this.url}/login`,
      user
    );
    return data.Data;
  }

  async register(user: Register): Promise<User> {
    const { data } = await this.axiosCLient.post<User>(
      `${this.url}/registro`,
      user
    );
    return data.Data;
  }
}
