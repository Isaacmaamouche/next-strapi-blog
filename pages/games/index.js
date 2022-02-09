import Head from "next/head";
import MySquareGridGames from "../../components/MySquareGridGames";

export default function AllGames({ data }) {
  return (
    <>
      <Head>
        <title>Tous les jeux</title>
      </Head>

      {data && (
        <>
          <div className="fade-in">
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold lh-1 p-4">Tous les jeux</h1>
            </div>
            <MySquareGridGames data={data} />
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fathomless-lake-03373.herokuapp.com/api/games?populate=*"
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
