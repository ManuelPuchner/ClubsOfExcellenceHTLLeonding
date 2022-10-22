import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({children}: {children: React.ReactNode}) {
  let showFooter = true;
  const router = useRouter();
  if (router.pathname.startsWith("/club/")) {
    showFooter = false;
  }
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

        {showFooter && <Footer />}
      </div>
    </>
  );
}
