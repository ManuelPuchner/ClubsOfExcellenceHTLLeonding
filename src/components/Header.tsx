// react
import { UserRole } from "generated/client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import NavLink from "./NavLink";
export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("hidden");
    }
  };

  const { data: session, status } = useSession();

  return (
    <nav className="fixed z-20 w-full border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 md:px-4">
      <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <NavLink href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/m.puchner/clubsofexcellence/htllogo.png" className="mr-3 h-9" alt="Flowbite Logo" />
          <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:block">
            Clubs of Excellence
          </span>
          <span className="self-center  whitespace-nowrap text-xl font-semibold dark:text-white sm:hidden">
            Clubs
          </span>
        </NavLink>
        <div className="flex items-center md:order-2">
          {status === "loading" || status === "unauthenticated" ? (
            <Link href="/api/auth/signin">
              <a className="mr-1 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-2 md:px-5 md:py-2.5">
                Log in
              </a>
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="mr-1 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-2 md:px-5 md:py-2.5"
            >
              Log out
            </button>
          )}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="mega-menu"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="mega-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          ref={menuRef}
          id="mega-menu"
          className="absolute left-1/2 hidden w-full -translate-x-1/2 translate-y-[5.9rem] items-center justify-between rounded-md bg-slate-50 text-sm dark:bg-gray-900 md:order-1 md:flex md:w-auto md:translate-y-0 md:p-2"
        >
          <ul className="flex flex-col font-medium md:flex-row md:space-x-8">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            {status === "authenticated" && (
              <li>
                <NavLink href="/club/create">Create a Club</NavLink>
              </li>
            )}
            <li>
              <NavLink href="#">Placeholder</NavLink>
            </li>
            {status === "authenticated" && session.user?.role === UserRole.ADMINISTRATOR && (
              <li>
                <NavLink href="/admin">Admin</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
