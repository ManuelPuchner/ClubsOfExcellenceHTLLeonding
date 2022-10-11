import { Card } from "flowbite-react";
import Footer from "../../components/Footer";
import Accordion from "../../components/Accordion";
import MarkdownStyled from "../../components/MarkdownStyled"; 
import { useRouter } from "next/router";

// TODO: add types
export default function ClubPageTemplate() {

  const router = useRouter();
  const { clubname } = router.query;
  const aboutMarkdown = `
  # About
  The Esports Club is a student-run organization that aims to provide a platform for students to compete in esports tournaments and to promote esports culture on campus. We host a variety of tournaments throughout the year, including League of Legends, Overwatch, Rocket League, and more. We also host a variety of events, including LAN parties, movie nights, and more. We are always looking for new members to join our club, so feel free to join our Discord server and say hi!
  - test
  - test
  `;

  const clubInfo = {
    clubname: "E-Sports",
    description: "Willkommen beim E-Sport Club der HTL Leonding",
    image: "/e-sports-card.png",
    about: aboutMarkdown,
    contact: {
      contactname: "Lorenz Horvath",
      image: "",
      email: "test@gmail.com",
      phone: "0664 1234567",
      linkButton: {
        text: "Discord",
        url: "https://discord.gg/club",
      },
    },
    socialMedia: {},
    qa: [
      {
        question: "Wie kann ich mitmachen?",
        answer: "# Join einach unserem Discord Server",
      },
      {
        question: "Wie kann ich mitmachen?",
        answer: "Join einach unserem Discord Server",
      },
      {
        question: "Wie kann ich mitmachen?",
        answer: "Join einach unserem Discord Server",
      },
    ],
  };
  let qanda: string | any[] | undefined = [];
  if (clubInfo.qa != undefined && clubInfo.qa.length != 0) {
    const temp = clubInfo.qa.map((qa: any) => {
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
          src={clubInfo.image}
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
                {clubInfo.description}
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
                  <MarkdownStyled>{clubInfo.about}</MarkdownStyled>
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
                          clubInfo.contact.image ||
                          `https://eu.ui-avatars.com/api/?name=${clubInfo.contact.contactname
                            .split(" ")
                            .join("+")}&size=250"`
                        }
                        alt={clubInfo.contact.contactname}
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {clubInfo.contact.contactname}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {clubInfo.contact.email}
                      </span>
                      <div className="mt-4 flex space-x-3 lg:mt-6">
                        <a
                          href={clubInfo.contact.linkButton?.url || "#"}
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
                        </a>
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
