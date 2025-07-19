import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { user } from "./database/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const authUser = await db
          .select()
          .from(user)
          .where(eq(user.email, credentials.email.toString()))
          .limit(1);

        if (authUser.length === 0) return null;
        const isValidPassword = await compare(
          credentials.password.toString(),
          authUser[0].password
        );
        if (!isValidPassword) return null;
        return {
          id: authUser[0].id,
          name: authUser[0].fullName,
          email: authUser[0].email,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
