import { Club } from "@prisma/client";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CardWithImage from "../components/cards/CardWithImage";
import { prisma } from "../server/db/client";

const Home = ({
  clubs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="homepage min-h-full">
      {clubs.map((club: Club) => (
        <div key={club.id}>
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
