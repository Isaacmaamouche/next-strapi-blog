// Context disabled to lower api call from client side

import { createContext, useState, useContext, useEffect } from "react";

const globalContext = createContext();

export default function Context({ children }) {
  const [categories, setCategories] = useState();
  const [games, setGames] = useState();

  // useEffect(() => {
  //   fetch("https://fathomless-lake-03373.herokuapp.com/api/games?populate=*")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGames(data);
  //       console.log("games fetched in context");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   fetch(
  //     "https://fathomless-lake-03373.herokuapp.com/api/categories?populate=*"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategories(data);
  //       console.log("categories fetched in context");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
    <globalContext.Provider
      value={{ value: { categories: categories, games: games } }}
    >
      {children}
    </globalContext.Provider>
  );
}

export const strapiContext = () => useContext(globalContext);
