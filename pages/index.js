import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MyHero from "../components/MyHero";
import MyGameList from "../components/MyGameList";
import thumbnailUrlBuilder from "../utilities/thumbnailUrlBuilder";

export default function Games({ data }) {
  const top5Data = data.slice(0, 5);

  return (
    <div className="mb-5 pb-5 fade-in">
      <MyHero />
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold lh-1 p-4">Le Top 5</h1>
      </div>
      {top5Data &&
        top5Data.map((game) => (
          <MyGameList
            key={game.id}
            heroTitle={game.attributes.name}
            heroText={game.attributes.description}
            redButton={"/games/" + game.attributes.game_id}
            score={game.attributes.score}
            img={thumbnailUrlBuilder(
              game.attributes.thumbnail.data.attributes.formats
            )}
          />
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fathomless-lake-03373.herokuapp.com/api/games?sort=score%3Adesc&filters[score][$gte]=18&populate=*"
  ).catch((error) => {
    console.error("Error:", error);
  });
  const { data } = await res.json();

  return {
    props: {
      data: data,
    },
    revalidate: 300,
  };
}
