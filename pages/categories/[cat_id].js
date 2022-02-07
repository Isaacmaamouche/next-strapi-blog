import Head from "next/head";
import MyGameList from "../../components/MyGameList";
import MyFeaturedGamesGrid from "../../components/MyFeaturedGamesGrid";

export default function Category({ data }) {
  const category = data.attributes;
  const games = data.attributes.games.data.sort((a, b) => {
    return b.attributes.score - a.attributes.score;
  });

  const top3 = games.slice(0, 3);
  // console.log(games);

  return (
    <>
      <Head>
        <title>{category.name}</title>
      </Head>

      <MyFeaturedGamesGrid catInfo={data} />

      {games &&
        games.map((game) => (
          <MyGameList
            key={game.id}
            heroTitle={game.attributes.name}
            heroText={game.attributes.description}
            redButton={"/games/" + game.attributes.game_id}
            score={game.attributes.score}
            img="https://via.placeholder.com/100x100"
          />
        ))}
    </>
  );
}

async function getCategoriesFromStrapi(cat_id) {
  let res;
  if (cat_id) {
    res = await fetch(
      `https://fathomless-lake-03373.herokuapp.com/api/categories?filters[cat_id][$eq]=${cat_id}&populate=*`
    ).catch((error) => {
      console.error("Error:", error);
    });
  } else {
    res = await fetch(
      "https://fathomless-lake-03373.herokuapp.com/api/categories"
    ).catch((error) => {
      console.error("Error:", error);
    });
  }

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

  return {
    props: {
      data: data[0],
    },
    revalidate: 300,
  };
}
