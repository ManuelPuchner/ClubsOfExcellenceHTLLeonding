import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
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
