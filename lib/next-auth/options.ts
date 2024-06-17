import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { retriveSingleData } from "../supabase/service";
import { User } from "@/types/user.type";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: User | null = await retriveSingleData(
          "users",
          "email",
          email
        );
        if (user) {
          const confirmPassword = await bcrypt.compare(password, user.password);

          if (confirmPassword) return user;

          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.photo = user.photo ?? "";
      }

      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email as string;
      }

      if ("name" in token) {
        session.user.name = token.name as string;
      }

      if ("photo" in token) {
        session.user.image = token.photo as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
