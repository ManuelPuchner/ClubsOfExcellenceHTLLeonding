import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import CardWithButton from "./CardWithButton";
import CardWithImage from "./CardWithImage";
import DefaultCard from "./DefaultCard";

// TODO: add types
export default function CardsSlider({ cardItems }: { cardItems: any[] }) {
  const [activeClubId, setActiveClubId] = useState(
    Math.floor(cardItems.length / 2) - 1
  );
  return (
    <div
      className={`clubs-cards md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 flex-col md:flex-row md:-translate-x-1/2 mx-auto flex items-center justify-center ${
        activeClubId == 0 ? "justify-end" : ""
      } w-[calc(5/6*100%)] md:w-full`}
    >
      <div className="block md:hidden">
        {cardItems.map((card, index) => {
          let cardItem;
          if (!(!!card.title && !!card.description)) {
            return null;
          } else if (!!card.image && !!card.buttonText && !!card.buttonLink) {
            cardItem = (
              <CardWithImage
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                image={card.image}
              />
            );
          } else if (!!card.buttonLink && !!card.buttonText) {
            cardItem = (
              <CardWithButton
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
              />
            );
          } else {
            cardItem = (
              <DefaultCard title={card.title} description={card.description} />
            );
          }
          return (
            <div key={index} className="my-3">
              {cardItem}
            </div>
          );
        })}
      </div>
      <div
        className={`hidden md:flex items-center justify-center lg:w-full ${
          activeClubId === 0 || activeClubId + 1 === cardItems.length
            ? "w-3/4"
            : ""
        }`}
      >
        {activeClubId !== 0 && (
          <div>
            <ChevronDoubleLeftIcon
              className="h-10 w-10 text-gray-500"
              onClick={() => {
                setActiveClubId(activeClubId - 1);
              }}
            />
          </div>
        )}
        {cardItems.map((card, index) => {
          let cardItem;
          if (
            !(!!card.title && !!card.description) ||
            index < activeClubId - 1 ||
            index > activeClubId + 1
          ) {
            return null;
          } else if (!!card.image && !!card.buttonText && !!card.buttonLink) {
            cardItem = (
              <CardWithImage
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                image={card.image}
              />
            );
          } else if (!!card.buttonLink && !!card.buttonText) {
            cardItem = (
              <CardWithButton
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
              />
            );
          } else {
            cardItem = (
              <DefaultCard title={card.title} description={card.description} />
            );
          }

          return (
            <div
              key={index}
              onClick={() => setActiveClubId(index)}
              className={`
                mx-2
                transition-all
                ${
                  index === activeClubId
                    ? "active scale-125 z-10 shadow-lg rounded-lg"
                    : "opacity-50"
                }
              `}
            >
              {cardItem}
            </div>
          );
        })}
        {activeClubId + 1 != cardItems.length && (
          <div>
            <ChevronDoubleRightIcon
              className="h-10 w-10 text-gray-500"
              onClick={() => {
                setActiveClubId(activeClubId + 1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
