// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import Layout from "../components/Layout";
import { env } from "src/env/client.mjs";

import type { NextComponentType } from "next"; //Import Component type
import { useRouter } from "next/router";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session} basePath="/m.puchner/clubsofexcellence/api/auth">
      <Layout>
        {Component?.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }): JSX.Element {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return <div>
      <h1 className="text-2xl font-bold text-white">You are not logged in</h1>
      <button onClick={() => router.push("/api/auth/signin")}
        className="mr-1 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-2 md:px-5 md:py-2.5"
      >Log in</button>
    </div>;
  }
  

  return <>{children}</>;
}

export default trpc.withTRPC(MyApp);
