import { InferGetStaticPropsType } from "next";
import { prisma } from "src/server/db/client";

import { GetServerSideProps } from "next";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import Link from "next/link";
export default function VerifyEmail({
  user,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
          <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Deine E-Mail Adresse wurde erfolgreich bestätigt!
          </h1>
          <Link href="/">
            <a className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Homepage
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const emailAuthUrlToken = ctx.query.token as string;
  if (!session || !emailAuthUrlToken || !session.user?.email || !session.user?.id) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if(!user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  if (user.emailVerified) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if(user.emailVerificationToken !== emailAuthUrlToken) {
    return {
      redirect: {
        destination: "/auth/verifyemail/error",
        permanent: false,
      },
    };
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      emailVerified: new Date(),
      isStudent: true,
      emailVerificationToken: null
    },
  });
  
  return {
    props: {
      user: JSON.parse(JSON.stringify(updatedUser)),
    },
  };
};
