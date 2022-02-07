import { useState, useEffect } from "react";
import Head from "next/head";
import Loading from "../../components/Loading";
import MySquareGridGames from "../../components/MySquareGridGames";

export default function AllGames({ data }) {
  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://fathomless-lake-03373.herokuapp.com/api/games?populate=*")
  //     .then((res) => res.json())
  //     .then((games) => {
  //       setData(games.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Tous les jeux</title>
      </Head>
      {data && (
        <>
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold lh-1 p-4">Tous les jeux</h1>
          </div>
          <MySquareGridGames data={data} />
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
