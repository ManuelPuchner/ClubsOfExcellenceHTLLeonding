// nextjs
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

export default function CardWithImage({
  title,
  description,
  buttonText,
  buttonLink,
  image,
}: CardProps) {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rounded-t-lg" src={image} alt="" />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link href={buttonLink}>
          <a className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {buttonText}
            <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4 stroke-[3px]" />
          </a>
        </Link>
      </div>
    </div>
  );
}
