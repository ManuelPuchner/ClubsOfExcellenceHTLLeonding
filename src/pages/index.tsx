import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import CardsSlider from "./components/cards/CardsSlider";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({
    text: "hello world",
  });

  const clubs = [
    {
      title: "Volleyball",
      description: "Willkommen beim Volleyball Club der HTL Leonding",
      buttonText: "mehr erfahren",
      buttonLink: "/volleyball",
      image: "/eee.png",
    },
    {
      title: "E-Sports",
      description: "Willkommen beim E-Sport Club der HTL Leonding",
      buttonText: "mehr erfahren",
      buttonLink: "/club/esports",
      image: "/e-sports-card.png",
    },
    {
      title: "Linux",
      description: "Willkommen beim Linux Club der HTL Leonding",
      buttonText: "mehr erfahren",
      buttonLink: "/linux",
      image: "/eee.png",
    },
    {
      title: "Schach",
      description: "Willkommen beim Schach Club der HTL Leonding",
      buttonText: "mehr erfahren",
      buttonLink: "/schach",
      image: "/eee.png",
    },
  ];

  return (
    <div className="homepage min-h-full">
      <CardsSlider cardItems={clubs} />
    </div>
  );
};

export default Home;
