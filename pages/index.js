import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MyHero from "../components/MyHero";
import MyGameList from "../components/MyGameList";
import thumbnailUrlBuilder from "../utilities/thumbnailUrlBuilder";

export default function Games() {
  const [top5Data, setTop5Data] = useState([]);
  const [top5isLoading, setTop5Loading] = useState(false);

  useEffect(() => {
    setTop5Loading(true);
    fetch(
      "https://fathomless-lake-03373.herokuapp.com/api/games?sort=score%3Adesc&filters[score][$gte]=18&populate=*"
    )
      .then((res) => res.json())
      .then((top5) => {
        setTop5Data(top5.data.slice(0, 5));
        setTop5Loading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //https://strapi.io/blog/postgre-sql-and-strapi-setup
  //https://github.com/vercel/next.js/tree/canary/examples/cms-strapi
  //https://github.com/strapi/strapi-starter-next-corporate
  //https://nextjs.org/examples

  //https://fathomless-lake-03373.herokuapp.com/api/games
  return (
    <div className="mb-5 pb-5 fade-in">
      <MyHero />
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold lh-1 p-4">Le Top 5</h1>
      </div>
      {top5Data && top5isLoading ? (
        <Loading />
      ) : (
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
        ))
      )}
    </div>
  );
}
