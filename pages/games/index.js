import { useState, useEffect } from "react";
import Head from "next/head";
import Loading from "../../components/Loading";
import MySquareGridGames from "../../components/MySquareGridGames";

export default function AllGames() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fathomless-lake-03373.herokuapp.com/api/games")
      .then((res) => res.json())
      .then((games) => {
        setData(games.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Tous les jeux</title>
      </Head>
      {data && isLoading ? (
        <Loading />
      ) : (
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
