import type { ClubsInfoState, QandA } from "club";
import create from "zustand";
import PictureEdit from "../../../components/PictureEdit";
import QandAEdit from "../../../components/QandAEdit";
import CreateClubStep from "./CreateClubStep";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { env } from "src/env/client.mjs";

export const useCreateClubStore = create<ClubsInfoState>((set) => ({
  clubname: "",
  image: "",
  description: "",
  qanda: new Array<QandA>(),
  adminId: "",
  imageName: "",
  setClubname: (clubname: string) => set({ clubname }),
  setImageName: (imageName: string) => set({ imageName }),
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
  setImage: (image: string) => set({ image }),
}));

function Create() {
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
  const setImage = useCreateClubStore((state) => state.setImage);

  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState<number | null>(null);
  const [results, setResults] = useState<
    {
      email: string | null;
      id: string;
      name: string | null;
      image: string | null;
      firstname: string | null;
      lastname: string | null;
    }[]
  >([]);

  const router = useRouter();

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

    if (data) {
      router.push(`/club/${data.clubname}`);
    }
  };


  const onImageChange = async (formData: FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };

    const response = await axios.post(env.NEXT_PUBLIC_BASE_PATH + "/api/upload/image", formData, config);

    if(response.status === 200 && response.data?.path) {
      setImage(response.data.path);
    }
  };

  const searchUserByEmailMutation = trpc.user.searchUserByEMail.useMutation();
  const searchUserByMail = (email: string) => {
    setEmail(email);

    if (timer) {
      window.clearTimeout(timer);
    }

    const newTimer = window.setTimeout(async () => {
      if (email.length > 0) {
        const data = await searchUserByEmailMutation.mutateAsync({ email });
        setResults(data);
        console.log(email, data);
      } else {
        setResults([]);
      }
    }, 500);

    setTimer(newTimer);
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
        <CreateClubStep stepText="Step 3: Kontact Person / Admin">
          <div className="relative">
            <label
              htmlFor="contactPerson"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Kontakt Person / Admin
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => searchUserByMail(e.target.value)}
              id="contactPerson"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="z.B.: m.muster@students.htl-leonding.ac.at"
              required
            />
            {results.length > 0 && (
              <div
                id="dropdown"
                className="absolute z-10 mt-2 w-fit divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  {results.map((result) => (
                    <li key={result.id}>
                      <button
                        onClick={() => {
                          setEmail(result.email || "");
                          setAdminId(result.id);
                          setResults([]);
                        }}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {result.email}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CreateClubStep>
        <CreateClubStep stepText="Step 4: Q&A">
          <QandAEdit useStore={useCreateClubStore} />
        </CreateClubStep>
        <CreateClubStep stepText="Step 5: Bild">
          <PictureEdit onChange={onImageChange} />
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

export default Create;
