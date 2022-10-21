import { ClubsInfoState } from "club";
import { StoreApi, UseBoundStore } from "zustand";

export default function PictureEdit({
  useStore,
}: {
  useStore: UseBoundStore<StoreApi<ClubsInfoState>>;
}) {
  const [image, setImage] = useStore((state) => [state.image, state.setImage]);
  const uploadImage = async () => {
    console.log("uploadImage");
  };
  return (
    <>
      <img
          src={image}
          alt="current image"
          className="
              mb-3 w-full rounded-md
            "
        />
        {/* <div
          id="fileUpload w-1"
          className="row-start-2 rounded-xl bg-slate-100 p-4 dark:bg-gray-900"
        >
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Upload file
          </label>

          <div className="flex">

            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              accept="image/png, image/gif, image/jpeg"
              id="user_avatar"
              type="file"
            />
            <button
              onClick={uploadImage}
              type="button"
              className="ml-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
            >
              Upload
            </button>
          </div>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            PNG, JPG, GIF bis zu 10MB
          </div>
        </div> */}
      <div className="">
        Das uploaden von Bildern ist derzeit noch in Entwicklung,
        bitte gib hier den Link zum Bild an.
      </div>
      <div>
        <div>
          <label
            htmlFor="url"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Image url
          </label>
          <input
            type="text"
            id="url"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="https://images.website.com/image.jpg"
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
