import { Spinner } from "flowbite-react";
import { Club } from "generated/client";
import { trpc } from "src/utils/trpc";
import CardWithImage from "../components/cards/CardWithImage";

const Home = () => {
  const { data: clubs, status } = trpc.club.getAllApprovedClubs.useQuery();
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-4xl font-bold text-white">Clubs zum beitreten</h1>
      {status === "loading" && <Spinner />}
      {status === "error" && <div>Error</div>}
      {status === "success" &&
        (clubs.length > 0 ? (
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
        ) : (
          <div className="flex justify-center">
            <h1 className="text-xl text-white">Keine Clubs gefunden</h1>
          </div>
        ))}
    </div>
  );
};

export default Home;
