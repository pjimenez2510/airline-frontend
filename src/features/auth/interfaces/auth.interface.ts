import { UserBase } from "@/features/users/interfaces/user.interface";

export interface Login {
  NombreUsuario: string;
  Password: string;
}

export interface Register extends UserBase {
  Password: string;
}
