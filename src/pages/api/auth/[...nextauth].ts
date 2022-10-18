import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import type { User } from "generated/client";

const scopes = ["identify"].join(" ");

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      const dbUser: User | null = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (dbUser) {
        session.user = dbUser;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
    // ...add more providers here
  ],
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        console.log("New user signed in", message);
        
      }
    },
  },
  pages: {
    newUser: "/auth/new-user",
  },
};

export default NextAuth(authOptions);
