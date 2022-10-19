import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <base href="/m.puchner/clubsofexcellence" />
      </Head>
      <div
        className="grid min-h-screen w-full dark:bg-slate-800 dark:text-slate-400"
        style={{ gridTemplateRows: "1fr auto" }}
      >
        <Header />
        <main className="relative mt-16 flex flex-col items-center justify-center dark:bg-slate-800">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
