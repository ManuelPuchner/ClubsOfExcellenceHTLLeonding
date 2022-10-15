import { ClubsInfoState } from "club";
import { useState } from "react";
import { UseBoundStore, StoreApi } from "zustand";
import Accordion from "./Accordion";
export default function QandAEdit({
  useStore,
}: {
  useStore: UseBoundStore<StoreApi<ClubsInfoState>>;
}) {
  const qa = useStore((state) => state.qanda);
  const [qaPreview, setQAPreview] = useState(false);
  const addQandAEmpty = useStore((state) => state.addQandAEmpty);
  const editQandA = useStore((state) => state.editQandA);
  const deleteQandA = useStore((state) => state.deleteQandA);
  return (
    <>
      <div>
        <div className="mb-3 flex flex-1 justify-between">
          <h3 className="mb-2 text-2xl font-bold dark:text-white">
            Q&A Section
          </h3>
          <button
            onClick={() => setQAPreview(!qaPreview)}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:hidden md:px-5 md:py-2.5"
          >
            {qaPreview ? "Bearbeiten" : "Vorschau"}
          </button>
        </div>
        <div className="mb-2 flex flex-col items-center justify-between">
          {qaPreview && qa && (
            <div className="w-full rounded-md border border-gray-200 p-3 pt-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
              {/* <MarkdownStyled children={qa.answer} /> */}
              <Accordion
                parts={qa.map((qa) => {
                  const mapped = {
                    title: qa.question,
                    content: qa.answer,
                  };
                  return mapped;
                })}
              />
            </div>
          )}
          {qa &&
            !qaPreview &&
            qa.map((qa, index) => (
              <div
                key={index}
                className="flex w-full flex-col border-emerald-100"
              >
                <div className="mb-3 w-full">
                  <label
                    htmlFor="question"
                    className="mb-2 block w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Question
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="question"
                      className="mr-2 block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={qa.question}
                      onChange={(e) => {
                        editQandA("question", e.target.value, index);
                      }}
                      required
                    />

                    <button
                      onClick={() => {
                        // delete question
                        deleteQandA(index);
                      }}
                      className="group inline-block  rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 group-hover:stroke-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="answer"
                    className="mb-2 block w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Answer (MarkDown)
                  </label>
                </div>
                <textarea
                  name="answer"
                  id="answer"
                  value={qa.answer}
                  onChange={(e) => {
                    editQandA("answer", e.target.value, index);
                  }}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                ></textarea>
              </div>
            ))}
        </div>
        {!qaPreview && (
          <div className="flex w-full justify-center">
            <button
              onClick={addQandAEmpty}
              className="inline-block  rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <h4 className="text-xl font-bold dark:text-white">Preview</h4>
        <div className="w-full rounded-md border border-gray-200 p-3 pt-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
          {/* <MarkdownStyled children={qa.answer} /> */}
          <Accordion
            parts={qa.map((qa) => {
              const mapped = {
                title: qa.question,
                content: qa.answer,
              };
              return mapped;
            })}
          />
        </div>
      </div>
    </>
  );
}
