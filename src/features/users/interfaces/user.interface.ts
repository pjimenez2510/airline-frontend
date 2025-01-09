export interface UserBase {
  Email: string;
  NombreCompleto: string;
  NombreUsuario: string;
  Telefono: string;
}

export interface User extends UserBase {
  UsuarioId: string;
}

export type UserCreate = UserBase;

export type UserUpdate = Partial<UserBase>;
