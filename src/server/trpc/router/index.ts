// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { clubRouter } from "./club";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  club: clubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
