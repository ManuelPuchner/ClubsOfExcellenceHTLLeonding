/* eslint-disable @next/next/no-img-element */
import { Club } from "generated/client";
import Link from "next/link";
import { useUpdateClubStore } from "src/pages/admin";
import { getImagePath } from "src/utils/imagePrefixer";

export default function ApproveClubCard({ club }: { club: Club }) {
  const setModalOpen = useUpdateClubStore((state) => state.setModalOpen);
  const setModalClubId = useUpdateClubStore((state) => state.setModalClubId);
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
}
