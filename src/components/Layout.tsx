import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div
      className="min-h-screen w-full grid dark:bg-slate-800 dark:text-slate-400"
      style={{ gridTemplateRows: "1fr auto" }}
    >
      <Header />
      <main className="relative dark:bg-slate-800 mt-16 flex flex-col items-center justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
}
