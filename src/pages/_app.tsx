// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import Layout from "./components/Layout";

import type { NextComponentType  } from 'next' //Import Component type

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
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

function Auth({ children }: { children: React.ReactNode}): JSX.Element {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default trpc.withTRPC(MyApp);
