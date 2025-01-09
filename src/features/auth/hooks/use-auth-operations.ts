"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "../services/auth.datasource";
import { Login, Register } from "../interfaces/auth.interface";
import { toast } from "sonner";
import { login } from "../services/actions/login";
import { signOut } from "next-auth/react";

export function useAuthOperations() {
  const authDatasource = AuthService.getInstance();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("callbackUrl");
  const router = useRouter();

  const handleRedirect = () => {
    const path = redirectPath ? redirectPath : "/vuelos";
    window.location.replace(path);
  };

  const loginHandler = async (data: Login) => {
    try {
      const res = await authDatasource.login(data);
      const isLogged = await login(res);

      if (!isLogged.ok) {
        return;
      }

      toast.success(isLogged.message);
      handleRedirect();
    } catch (error) {
      console.error(error);
    }
  };

  const registerHandler = async (data: Register) => {
    try {
      const res = await authDatasource.register(data);
      const isLogged = await login(res);

      if (!isLogged.ok) {
        return;
      }

      toast.success(isLogged.message);
      handleRedirect();
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada exitosamente");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loginHandler,
    registerHandler,
    logoutHandler,
  };
}
