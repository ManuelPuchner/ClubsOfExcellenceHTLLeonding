import type { ClubsInfoState, QandA } from "club";
import create from "zustand";
import PictureEdit from "../../components/PictureEdit";
import QandAEdit from "../../components/QandAEdit";
import CreateClubStep from "./CreateClubStep";
import { trpc } from "../../../utils/trpc";
import { Club } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const useCreateClubStore = create<ClubsInfoState>((set) => ({
  clubname: "",
  image: "",
  description: "",
  qanda: new Array<QandA>(),
  adminId: "",
  setClubname: (clubname: string) => set({ clubname }),
  setImage: (image: string) => set({ image }),
  addQandAEmpty: () =>
    set((state) => ({ qanda: [...state.qanda, { question: "", answer: "" }] })),
  editQandA: (key: keyof QandA, value: string, index: number) =>
    set((state) => {
      const newQandA: QandA[] = [...state.qanda];
      const elementToEdit = newQandA[index];
      if (elementToEdit !== undefined) {
        elementToEdit[key] = value;
      }
      return { qanda: newQandA };
    }),
  deleteQandA: (index: number) =>
    set((state) => {
      const newQandA = [...state.qanda];
      newQandA.splice(index, 1);
      return { qanda: newQandA };
    }),
  setDescription: (description: string) => set({ description }),
  setAdminId: (adminId: string) => set({ adminId }),
}));

function Create({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [clubName, setClubName] = useCreateClubStore((state) => [
    state.clubname,
    state.setClubname,
  ]);
  const [description, setDescription] = useCreateClubStore((state) => [
    state.description,
    state.setDescription,
  ]);
  const [adminId, setAdminId] = useCreateClubStore((state) => [
    state.adminId,
    state.setAdminId,
  ]);

  const mutation = trpc.club.createClub.useMutation();

  const submitClub = async () => {
    const state = useCreateClubStore.getState();

    const data = await mutation.mutateAsync({
      clubname: state.clubname,
      description: state.description,
      image: state.image,
      qanda: state.qanda,
      adminId: state.adminId,
    });

    console.log(data);
  };
  return (
    <div
      className="container mx-auto mt-8 grid min-h-full w-full px-4"
      style={{ gridTemplateRows: "1fr auto 1fr" }}
    >
      <h1 className="text-4xl font-bold dark:text-white">Create your Club</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <CreateClubStep stepText="Schritt 1: Club Name">
          <div>
            <label
              htmlFor="clubName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Club Name
            </label>
            <input
              onChange={(e) => setClubName(e.target.value)}
              value={clubName}
              type="text"
              id="clubName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="z.B.: E-Sports"
              required
            />
          </div>
        </CreateClubStep>
        <CreateClubStep stepText="Schritt 2: Club Beschreibung">
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Club Description
            </label>
            <textarea
              id="message"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="z.B.: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            ></textarea>
          </div>
        </CreateClubStep>
        <CreateClubStep stepText="Step 3: Kontact Person">
          {/* <div>
            <label
              htmlFor="contactPerson"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Kontakt Person
            </label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              id="contactPerson"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="z.B.: @manuel.pchnr"
              required
            />
          </div> */}
        </CreateClubStep>
        <CreateClubStep stepText="Step 4: Q&A">
          <QandAEdit useStore={useCreateClubStore} />
        </CreateClubStep>
        <CreateClubStep stepText="Step 5: Bild">
          <PictureEdit useStore={useCreateClubStore} />
        </CreateClubStep>
        <CreateClubStep stepText="Step 6: Submit">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 w-full text-start">
              <p>Reiche denen Vorschlag ein.</p>
              <p>Deine Einreichung muss noch geprüft werden</p>
              <p>Wir bitten um dein Verständnis</p>
            </div>
            <button
              onClick={submitClub}
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-white"
            >
              Submit
            </button>
          </div>
        </CreateClubStep>
      </div>
      {/* <div className="flex justify-between">
        <button
          type="button"
          className="py-2.5 h-fit px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Zurück
        </button>

        <button
          type="button"
          className="text-white h-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Nächster Schritt
        </button>
      </div> */}
    </div>
  );
}

Create.auth = true;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  if (session.user?.isNewUser) {
    return {
      redirect: {
        destination: "/auth/new-user",
        permanent: false,
      },
    };
  }

  if (!session.user?.isStudent) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      test: "hello",
    },
  };
};

export default Create;
