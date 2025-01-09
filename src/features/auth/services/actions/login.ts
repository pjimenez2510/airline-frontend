"use server";

import { signIn } from "@/auth.config";
import { User } from "@/features/users/interfaces/user.interface";

export const login = async (params: User) => {
  try {
    await signIn("credentials", {
      id: params.UsuarioId,
      firstName: params.NombreCompleto,
      username: params.NombreUsuario,
      email: params.Email,
      phone: params.Telefono,
      redirect: false,
    });
    return { ok: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al iniciar sesión" };
  }
};
