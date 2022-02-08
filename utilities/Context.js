import { createContext, useState, useContext, useEffect } from "react";

const globalContext = createContext();

export const strapiContext = () => useContext(globalContext);

export default function Context({ children }) {
  const [categories, setCategories] = useState();
  const [games, setGames] = useState();

  useEffect(() => {
    fetch("https://fathomless-lake-03373.herokuapp.com/api/games?populate=*")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      "https://fathomless-lake-03373.herokuapp.com/api/categories?populate=*"
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <globalContext.Provider
      value={{ value: { categories: categories, games: games } }}
    >
      {children}
    </globalContext.Provider>
  );
}
