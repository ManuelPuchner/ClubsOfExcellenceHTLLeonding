import { Club } from "generated/client";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CardWithImage from "../components/cards/CardWithImage";
import { prisma } from "../server/db/client";

const Home = ({
  clubs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="py-6 px-4 container mx-auto">
      <h1 className="text-4xl font-bold text-white">Clubs zum beitreten</h1>
      <div className="homepage flex min-h-full flex-wrap justify-center gap-4 ">
        {clubs.map((club: Club) => (
          <div key={club.id} className="">
            <CardWithImage
              title={club.clubname}
              description={club.description}
              buttonText={"Join"}
              buttonLink={`/club/${club.clubname}`}
              image={club.image || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ clubs: Club[] }> = async (
  ctx
) => {
  const clubs = await prisma.club.findMany();
  return {
    props: {
      clubs,
    },
  };
};

export default Home;
