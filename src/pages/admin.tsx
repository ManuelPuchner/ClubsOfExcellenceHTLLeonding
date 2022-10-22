/* eslint-disable @next/next/no-img-element */
import { Club } from "generated/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "src/components/Spinner";
import { getImagePath } from "src/utils/imagePrefixer";
import { trpc } from "src/utils/trpc";
import create from "zustand";

type StoreType = {
  modalClubId: string;
  setModalClubId: (clubId: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setApprovalMutation: any;
  clubs: Club[];
  setClubApproval: (clubId: string, approved: boolean) => void;
};

const useUpdateClubStore = create<StoreType>((set, get) => ({
  modalClubId: "",
  setModalClubId: (clubId: string) => set({ modalClubId: clubId }),
  modalOpen: false,
  setModalOpen: (open: boolean) => set({ modalOpen: open }),

  clubs: [],
  setApprovalMutation: null,
  setClubApproval: async (clubId: string, approved: boolean) => {
    const _isApproved: boolean = await get().setApprovalMutation.mutateAsync({
      clubId,
      approved,
    });
    set((state) => {
      const newClubs = [...state.clubs];
      const index = newClubs.findIndex((club) => club.id === clubId);
      if (index !== -1) {
        const temp = newClubs[index];
        if (temp) {
          temp.isApproved = _isApproved;
          newClubs[index] = temp;
        }
      }
      return { clubs: newClubs };
    });
  },
}));

function Admin() {
  const { data: clubs, status } = trpc.club.getAllClubs.useQuery();
  const setApprovalMutation = trpc.club.setClubApproval.useMutation();
  useEffect(() => {
    useUpdateClubStore.setState({ clubs: clubs || [], setApprovalMutation });
  }, [clubs, setApprovalMutation]);
  const isModalOpen = useUpdateClubStore((state) => state.modalOpen);

  return (
    <>
      <div className="container relative mx-auto px-4">
        <h1>Admin</h1>
        <p>Only visible to admins.</p>

        {status === "loading" && <Spinner />}
        {status === "error" && <p>Error</p>}
        {status === "success" && <LoadedView />}
      </div>
      {isModalOpen && <ApproveClubModal />}
    </>
  );
}

function ApproveClubModal() {
  const [setModalOpen] = useUpdateClubStore((state) => [state.setModalOpen]);
  const [modalClubId, setModalClubId] = useUpdateClubStore((state) => [
    state.modalClubId,
    state.setModalClubId,
  ]);
  const [setClubApproval] = useUpdateClubStore((state) => [
    state.setClubApproval,
  ]);
  const clubs = useUpdateClubStore((state) => state.clubs);

  const getIsApproved = (clubId: string) => {
    return (
      clubs.findIndex((club) => club.id === clubId && club.isApproved) !== -1
    );
  };
  const [isApproved] = useState(getIsApproved(modalClubId));

  const approveClub = () => {
    setClubApproval(modalClubId, true);
    setModalOpen(false);
  };
  const unApproveClub = () => {
    setClubApproval(modalClubId, false);
    setModalOpen(false);
  };
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="h-modal fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden backdrop-blur-sm backdrop-filter md:inset-0 md:h-full"
    >
      <div className="relative top-1/2 left-1/2 h-full w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <button
            onClick={() => setModalOpen(false)}
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
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
            <h3 className="text-˚lg mb-5 font-normal text-gray-500 dark:text-gray-400">
              {isApproved
                ? "Bist du dir sicher, dass du den Club nicht mehr freischalten möchtest?"
                : "Sind sie sicher das sie diesen Club freigeben wollen?"}
            </h3>

            <button
              onClick={() => {
                setModalOpen(false);
              }}
              data-modal-toggle="popup-modal"
              type="button"
              className="mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Nein, abbrechen
            </button>
            <button
              onClick={() => {
                if (isApproved) {
                  unApproveClub();
                } else {
                  approveClub();
                }
                setModalOpen(false);
                setModalClubId("");
              }}
              data-modal-toggle="popup-modal"
              type="button"
              className={`${
                isApproved
                  ? "bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800"
                  : "bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800"
              } inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4`}
            >
              Ja, bin ich
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadedView() {
  const [clubs] = useUpdateClubStore((state) => [state.clubs]);
  const setModalOpen = useUpdateClubStore((state) => state.setModalOpen);
  const setModalClubId = useUpdateClubStore((state) => state.setModalClubId);
  return (
    <div className="">
      {clubs?.map((club: Club) => {
        return (
          <div
            key={club.id}
            className="relative mx-0 mb-4 flex w-full flex-col rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:max-w-xl md:flex-row"
          >
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={getImagePath(club.image)}
              alt=""
            />
            <div className="w-full">
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {club.clubname}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {club.description.length > 100
                    ? club.description.substring(0, 100) + "..."
                    : club.description}
                </p>
                <div className="absolute top-2 right-2 flex flex-col justify-between leading-normal">
                  {club.isApproved ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                      Not Approved
                    </span>
                  )}
                </div>
              </div>
              <div className="mr-2 mb-3 flex justify-end">
                <Link href={`/club/${club.clubname}`}>
                  <a className="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                    View
                  </a>
                </Link>

                {club.isApproved && (
                  <>
                    <Link href={`/club/${club.clubname}/admin`}>
                      <a
                        className={
                          !club.isApproved
                            ? `mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700`
                            : `
                    "text-white dark:focus:ring-blue-800" mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700`
                        }
                      >
                        Admin
                      </a>
                    </Link>
                    <button
                      onClick={() => {
                        setModalClubId(club.id);
                        setModalOpen(true);
                      }}
                      className="mr-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Undo Approval
                    </button>
                  </>
                )}
                {!club.isApproved && (
                  <button
                    onClick={() => {
                      setModalClubId(club.id);
                      setModalOpen(true);
                    }}
                    className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Admin.auth = true;

export default Admin;
