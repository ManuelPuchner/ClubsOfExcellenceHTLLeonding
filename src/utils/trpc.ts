// src/utils/trpc.ts
import { httpBatchLink, httpLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/trpc/router";
import superjson from "superjson";

export const getBaseUrl = () => {
  let baseUrl = "";
  if (typeof window !== "undefined") baseUrl = window.location.origin; // browser should use relative url
  else if (process.env.VERCEL_URL) baseUrl = `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  else baseUrl = `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
  return baseUrl;
};

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url = getBaseUrl() + process.env.NEXT_PUBLIC_BASE_PATH + "/api/trpc";
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
    };
  },
  ssr: false,
});
