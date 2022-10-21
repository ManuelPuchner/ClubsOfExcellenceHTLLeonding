import { UserRole } from "generated/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

function NewUser() {
  const { data: session, status } = useSession();
  const [showUpdatedSuccess, setShowUpdatedSuccess] = React.useState(false);

  const router = useRouter();

  const newUserMutation = trpc.auth.updateNewUser.useMutation();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username")?.toString() || "",
      firstname: formData.get("firstname")?.toString() || "",
      lastname: formData.get("lastname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
    };
    console.log(data);

    newUserMutation.mutate(data);
    setShowUpdatedSuccess(true);
  };

  if (session?.user?.role !== UserRole.NEW_USER) {
    return (
      <>
        <div className="relative h-screen w-full max-w-md p-4 md:h-auto">
          <div className="relative rounded-lg border bg-white shadow dark:border-slate-600 dark:bg-gray-700">
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Schaut so aus als wärst du schon mal hier gewesen.
              </h3>

              <Link href="/api/auth/signin">
                <a
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                >
                  Login mit neuem Account
                </a>
              </Link>
              <Link href="/">
                <a
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="ml-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Homescreen
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showUpdatedSuccess) {
    return (
      <>
        <div className="container mx-auto p-4">
          <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Vielen Dank!</h1>
            <p>Bitte überprüfe dein E-Mail Postfach</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={submitForm}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Erstelle einen Account
          </h5>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Überschreibe denen Benutzernamen (optional)
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder={session?.user?.name || "Maxi.Mustermann"}
            />
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dein Vorname
            </label>
            <input
              type="firstname"
              name="firstname"
              id="firstname"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Maximilian"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dein Nachname
            </label>
            <input
              type="lastname"
              name="lastname"
              id="lastname"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Mustermann"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Deine Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="m.mustermann@students@htl-leonding.ac.at"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Deine Telefonnummer (optional)
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="+43 664 1234567"
            />
          </div>
          <div></div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Account updaten
          </button>
        </form>
      </div>
    </div>
  );
}

NewUser.auth = true;

export default NewUser;
