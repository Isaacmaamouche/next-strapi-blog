import Head from "next/head";
import MyGameList from "../../components/MyGameList";
import MyFeaturedGamesGrid from "../../components/MyFeaturedGamesGrid";
import thumbnailUrlBuilder from "../../utilities/thumbnailUrlBuilder";

export default function Category({ data }) {
  const category = data.data.attributes;
  const games = category.games.data.sort((a, b) => {
    return b.attributes.score - a.attributes.score;
  });

  const gamesData = data.gamesData;

  const top3 = [];
  games.slice(0, 3).forEach((game) => {
    top3.push(gamesData.filter((gameData) => gameData.id == game.id)[0]);
  });

  function Thumbail(targetID) {
    const targetGame = gamesData.filter((gameData) => gameData.id == targetID);
    return thumbnailUrlBuilder(
      targetGame[0].attributes.thumbnail.data.attributes.formats
    );
  }

  return (
    <>
      <Head>
        <title>{category.name}</title>
      </Head>

      <MyFeaturedGamesGrid catName={category.name} top3={top3} />

      {games &&
        games.map((game) => (
          <MyGameList
            key={game.id}
            heroTitle={game.attributes.name}
            heroText={game.attributes.description}
            redButton={"/games/" + game.attributes.game_id}
            score={game.attributes.score}
            img={Thumbail(game.id)}
          />
        ))}
    </>
  );
}

async function getCategoriesFromStrapi(cat_id) {
  const res = await fetch(
    `https://fathomless-lake-03373.herokuapp.com/api/categories?filters[cat_id][$eq]=${cat_id}&populate=*`
  ).catch((error) => {
    console.error("Error:", error);
  });

  const { data } = await res.json();
  return data;
}

async function getGamesFromStrapi() {
  const res = await fetch(
    "https://fathomless-lake-03373.herokuapp.com/api/games?populate=*"
  ).catch((error) => {
    console.error("Error:", error);
  });
  const { data } = await res.json();
  return data;
}

export async function getStaticPaths() {
  const data = await getCategoriesFromStrapi();

  const paths = data.map((category) => ({
    params: {
      cat_id: category.attributes.cat_id,
    },
  }));
  return {
    paths,
    fallback: "blocking", // 'blocking' to server-side render not generated pages
  };
}

export async function getStaticProps({ params }) {
  const { cat_id } = params;
  const data = await getCategoriesFromStrapi(cat_id);
  const gamesData = await getGamesFromStrapi();
  // console.log(gamesData.attributes);
  const props = { data: data[0], gamesData: gamesData };

  return {
    props: {
      data: props,
    },
    revalidate: 300,
  };
}
