import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName: string;
      username: string;
      email: string;
      phone: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    username: string;
    email: string;
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    firstName?: string;
    username?: string;
    email?: string;
    phone?: string;
  }
}
