import Head from "next/head";
import Link from "next/link";

export default function AllCategories({ data }) {
  return (
    <>
      <Head>
        <title>Toutes les catégories</title>
      </Head>

      {data && (
        <>
          <div className=" m-5 fade-in text-center">
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold p-4">Toutes les catégories</h1>
            </div>

            {data.map((category) => (
              <div className=" mb-5">
                <h1 className="lh-1">
                  <Link
                    passHref
                    href={`/categories/${category.attributes.cat_id}`}
                  >
                    {category.attributes.name}
                  </Link>
                </h1>
                <h3>
                  <Link
                    passHref
                    href={`/categories/${category.attributes.cat_id}`}
                  >
                    {category.attributes.games.data.length + " jeux"}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://fathomless-lake-03373.herokuapp.com/api/categories?populate=*"
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
