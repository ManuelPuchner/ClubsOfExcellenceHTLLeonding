import { Card } from "flowbite-react";
import Footer from "../../components/Footer";
import Accordion, { AccordionPartProp } from "../../components/Accordion";
import MarkdownStyled from "../../components/MarkdownStyled";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../../../server/db/client";
import { Club, User, QandA } from "@prisma/client";

export default function ClubPageTemplate({
  clubInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(clubInfo);

  let qanda: AccordionPartProp[] = [];
  if (clubInfo.qanda != undefined && clubInfo.qanda.length != 0) {
    const temp = clubInfo.qanda.map((qa: QandA) => {
      return {
        title: qa.question,
        content: qa.answer,
      };
    });
    qanda = temp;
  }
  return (
    <>
      {/* parallax effect */}
      <div className="relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={clubInfo.image || ""}
          alt="club image"
          className="h-128 fixed left-0 z-0 w-full object-cover opacity-80"
        />
        <div
          className="absolute w-full bg-white dark:bg-slate-800"
          style={{ top: "calc(100vw / 16 * 9)" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mt-16 mb-8 text-center text-4xl font-bold dark:text-white">
                {clubInfo.clubname}
              </h1>
            </div>
          </div>
          {/* club info */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-4 gap-y-20 md:grid-cols-2">
              <div className="col-span-1 mx-auto w-2/3">
                <h2 className="mb-3 text-3xl font-bold dark:text-white">
                  About
                </h2>
                <div className="rounded-lg border border-gray-200 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <MarkdownStyled>{clubInfo.description}</MarkdownStyled>
                </div>
              </div>
              <div className="col-span-1 mx-auto w-2/3">
                <h2 className="mb-3 text-3xl font-bold dark:text-white">
                  Contact
                </h2>
                <div className="max-w-sm">
                  <Card>
                    <div className="flex flex-col items-center pb-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="mb-3 h-24 w-24 rounded-full shadow-lg"
                        src={
                          clubInfo.admin.customImage ||
                          clubInfo.admin.image ||
                          `https://eu.ui-avatars.com/api/?name=${clubInfo.admin.firstname}+${clubInfo.admin.lastname}&size=250"`
                        }
                        alt={
                          clubInfo.admin.firstname +
                          " " +
                          clubInfo.admin.lastname +
                          " Profilbild"
                        }
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {clubInfo.admin.firstname +
                          " " +
                          clubInfo.admin.lastname}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {clubInfo.admin.email}
                      </span>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        {/* <a
                          href={clubInfo.admin.linkButton?.url || "#"}
                          target="_blank"
                          className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          rel="noreferrer"
                        >
                          Discord
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          Placeholder
                        </a> */}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="container mx-auto w-4/6 md:col-span-2">
                <h2 className="mb-3 text-3xl font-bold dark:text-white">Q&A</h2>
                {qanda != undefined && qanda.length != 0 && (
                  <div className="">
                    <Accordion parts={qanda} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

type ClubInfo = Club & {
  admin: User;
  qanda: QandA[];
};

export const getServerSideProps: GetServerSideProps<{
  clubInfo: ClubInfo;
}> = async (ctx) => {
  const clubName = ctx.params?.clubname as string;

  const dbclub = await prisma.club.findUnique({
    where: {
      clubname_urlClubname: {
        clubname: clubName,
        urlClubname: clubName,
      }
    },
    include: {
      qanda: true,
      admin: true,
    },
  });

  console.log(dbclub);

  if (clubName == undefined) {
    return {
      notFound: true,
    };
  }

  if (!dbclub) {
    return {
      notFound: true,
    };
  }

  const clubInfo: ClubInfo = JSON.parse(JSON.stringify(dbclub));

  return {
    props: {
      clubInfo: clubInfo,
    },
  };
};
