"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAuthOperations } from "./use-auth-operations";

const schema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "El número de teléfono solo debe contener digitos")
    .min(8, "El número de teléfono debe tener al menos 8 dígitos"),
  fullName: z.string().min(1, "El nombre es requerido"),
  username: z.string().min(1, "El nombre de usuario es requerido"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 carácteres"),
});

type FormFields = z.infer<typeof schema>;

export function useRegister() {
  const { registerHandler } = useAuthOperations();

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await registerHandler({
      NombreCompleto: data.fullName,
      NombreUsuario: data.username,
      Email: data.email,
      Password: data.password,
      Telefono: data.phoneNumber,
    });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}
