"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFInput from "@/components/rhf/RHFInput";
import RHFPasswordInput from "@/components/rhf/RHFPasswordInput";
import { useLogin } from "../../hooks/use-login-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const { methods, onSubmit, isSubmiting } = useLogin();

  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("callbackUrl");
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center  w-full max-w-xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <RHFInput name="email" label="Nombre de usuario" />
          <RHFPasswordInput name="password" label="Contraseña" />

          <Button className="my-4" disabled={isSubmiting} type="submit">
            {isSubmiting ? <LoadingSpinner /> : "Ingresar"}
          </Button>
        </form>
        <p className="text-center text-sm">
          No tienes una cuenta?{" "}
          <Link
            href={
              redirectPath
                ? `/register?callbackUrl=${redirectPath}`
                : "/register"
            }
            className="text-blue-500 hover:underline"
          >
            Registrate
          </Link>
        </p>
      </FormProvider>
    </>
  );
};

export default LoginForm;
