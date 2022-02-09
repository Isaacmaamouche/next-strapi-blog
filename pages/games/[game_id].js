import Head from "next/head";
import Image from "next/image";
import { Card, Button, ProgressBar } from "react-bootstrap";
import thumbnailUrlBuilder from "../../utilities/thumbnailUrlBuilder";

export default function Game({ data }) {
  const game = data.attributes;

  return (
    <>
      <Head>
        <title>{game.name}</title>
      </Head>

      <div className="container gamePage my-5">
        <div className="left d-none d-md-block">
          <Image
            className="blockImg mb-2 scaleHover"
            src={thumbnailUrlBuilder(game.thumbnail.data.attributes.formats)}
            alt={game.name}
            width={500}
            height={500}
          />
          <ProgressBar
            className="score"
            now={game.score}
            label={game.score + "/20"}
            max={20}
          />
          <h5>Sortie le : {game.date}</h5>
        </div>
        <div className="right d-none d-md-block">
          <h1>{game.name}</h1>
          <p>{game.description}</p>

          <Button
            className="btn-red"
            href={`${game.jvc_link}`}
            target="_blank"
            rel="noreferrer"
            alt={game.name}
          >
            Lire le text sur JVC.com
          </Button>
        </div>

        <div className="smallScreen d-md-none">
          <Image
            className="blockImg mb-2"
            src={thumbnailUrlBuilder(game.thumbnail.data.attributes.formats)}
            alt={game.name}
            width={500}
            height={500}
          />
          <h1>{game.name}</h1>
          <ProgressBar
            className="score"
            now={game.score}
            label={game.score + "/20"}
            max={20}
          />
          <h5>Sortie le : {game.date}</h5>
          <p>{game.description}</p>
          <Button
            className="btn-red"
            href={`${game.jvc_link}`}
            target="_blank"
            rel="noreferrer"
            alt={game.name}
          >
            Lire le text sur JVC.com
          </Button>
        </div>
      </div>
    </>
  );
}

async function getGamesFromStrapi(game_id) {
  let res;
  if (game_id) {
    res = await fetch(
      `https://fathomless-lake-03373.herokuapp.com/api/games?filters[game_id][$eq]=${game_id}&populate=*`
    ).catch((error) => {
      console.error("Error:", error);
    });
  } else {
    res = await fetch(
      "https://fathomless-lake-03373.herokuapp.com/api/games"
    ).catch((error) => {
      console.error("Error:", error);
    });
  }

  const { data } = await res.json();
  return data;
}

export async function getStaticPaths() {
  const data = await getGamesFromStrapi();
  const paths = data.map((game) => ({
    params: {
      game_id: game.attributes.game_id,
    },
  }));
  return {
    paths,
    fallback: "blocking", // 'blocking' to server-side render not generated pages
  };
}

export async function getStaticProps({ params }) {
  const { game_id } = params;
  const data = await getGamesFromStrapi(game_id);

  return {
    props: {
      data: data[0],
    },
    revalidate: 300,
  };
}
