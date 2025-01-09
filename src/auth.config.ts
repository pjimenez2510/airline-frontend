import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { NextResponse } from "next/server";
import { isAllowed } from "./lib/route-permissions";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {},
        firstName: {},
        username: {},
        email: {},
        phone: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            id: z.string(),
            firstName: z.string(),
            username: z.string(),
            email: z.string(),
            phone: z.string(),
          })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        return { ...parsedCredentials.data };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.username = user.username;
        token.email = user?.email as string;
        token.phone = user?.phone as string;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl, url } }) {
      const { pathname } = nextUrl;
      const user = auth?.user;

      if (pathname === "/login" && user) {
        const redirectPath = "/vuelos";
        if (!redirectPath) return true;
        return NextResponse.redirect(new URL(redirectPath, url));
      }

      if (pathname === "/register" && user) {
        const redirectPath = "/vuelos";
        if (!redirectPath) return true;
        return NextResponse.redirect(new URL(redirectPath, url));
      }

      const routerPermison = isAllowed(pathname);

      if (!user && routerPermison) return false;

      return true;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
