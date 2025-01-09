"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useAuthOperations } from "./use-auth-operations";

const schema = z.object({
  email: z.string().min(1, "El email es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 carácteres"),
});

type FormFields = z.infer<typeof schema>;

export function useLogin() {
  const { loginHandler } = useAuthOperations();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await loginHandler({ NombreUsuario: data.email, Password: data.password });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}
