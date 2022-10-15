import {  useState } from "react";
import MarkdownStyled from "./MarkdownStyled";

export type AccordionPartProp = {
  title: string;
  content: string;
};
export interface AccordionProps  {
  parts: AccordionPartProp[];
}
export default function Accordion({ parts }: AccordionProps) {
  const [activePart, setActivePart] = useState(0);

  const swichToPart = (part: number) => {
    if (activePart === part) {
      setActivePart(-1);
    } else {
      setActivePart(part);
    }
  }
  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {parts.map((part, index) => {
        return (
          <div key={index}>
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className={`${index === 0 && "rounded-t-xl"} ${
                  index === parts.length - 1
                    ? activePart === index
                      ? "border-b-0"
                      : "rounded-b-xl"
                    : "border-b-0"
                } ${
                  index === activePart
                    ? "bg-gray-100 dark:bg-gray-900 dark:text-white"
                    : "text-gray-500"
                }
                 flex items-center justify-between w-full p-5 font-medium text-left border border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900`}
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
                onClick={() => swichToPart(index)}
              >
                <span>{part.title}</span>
                {activePart === index ? (
                  <svg
                    data-accordion-icon
                    className="w-6 h-6 rotate-180 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={activePart === index ? "block" : "hidden"}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div
                className={`p-5 font-light border ${
                  index === parts.length - 1
                    ? activePart === index
                      ? "rounded-b-xl"
                      : ""
                    : "border-b-0"
                } border-gray-200  dark:border-gray-700 dark:bg-gray-800 text-gray-500 dark:text-gray-400`}
              >
                <MarkdownStyled>
                  {part.content}
                </MarkdownStyled>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
