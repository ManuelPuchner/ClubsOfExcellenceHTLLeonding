/* eslint-disable @next/next/no-img-element */
import { ClubsInfoState } from "club";
import { createRef, useState } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { useCreateClubStore } from "src/pages/club/create";
import { StoreApi, UseBoundStore } from "zustand";

const dropZoneRef = createRef<DropzoneRef>();
export default function PictureEdit({
  onChange,
}: {
  onChange: (formData: FormData) => void;
}) {
  const [imageName, setImageName] = useCreateClubStore((state) => [
    state.imageName,
    state.setImageName,
  ]);
  const [imageError, _setImageError] = useState(false);

  const setImageError = (error: boolean) => {
    _setImageError(error);
    setTimeout(() => {
      _setImageError(false);
    }, 3000);
  };

  const onChangeImage = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0] !== undefined) {
      setImageError(false);
      const image = acceptedFiles[0];

      if (!image.type.startsWith("image/")) {
        setImageError(true);
        return;
      }
      const formData = new FormData();
      formData.append("image", image);

      setImageName(image.name);
      onChange(formData);
    }
  };

  return (
    <>
      <Dropzone
        onDrop={onChangeImage}
        ref={dropZoneRef}
        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        multiple={false}
        onDropRejected={() => setImageError(true)}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <>
            {acceptedFiles[0] !== undefined && (
              <img
                src={URL.createObjectURL(acceptedFiles[0])}
                alt="current image"
                className="
                      mb-3 w-full rounded-md
                    "
              />
            )}
            <div
              id="fileUpload w-1"
              className="flex flex-col rounded-xl  row-start-2 bg-slate-100 p-4 dark:bg-gray-900"
            >
              <div>
                <div className="flex w-full items-center justify-center">
                  <label
                    {...getRootProps()}
                    htmlFor="dropzone-file"
                    className={`${
                      imageError
                        ? "border-red-300 dark:border-red-600"
                        : acceptedFiles.length > 0
                        ? "border-green-300 dark:border-green-600"
                        : "h-64 border-gray-300 dark:border-gray-600"
                    } dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed  bg-gray-50 hover:bg-gray-100  dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {acceptedFiles.length > 0 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mb-3 h-10 w-10 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{imageName}</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            aria-hidden="true"
                            className="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG (MAX. 10MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input {...getInputProps()} />
                  </label>
                </div>
              </div>
              {acceptedFiles.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImageName("");
                    acceptedFiles.length = 0;
                  }}
                  className="text-sm pt-4 place-self-end text-gray-400 hover:text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Remove upload
                </button>
              )}
            </div>
          </>
        )}
      </Dropzone>
    </>
  );
}
