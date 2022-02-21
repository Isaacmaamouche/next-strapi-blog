import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Parser from "rss-parser";
import NewsCard from "../../components/NewsCard";

export default function RSS({ data }) {
  const setIncrement = 5;
  const [setNumber, setSetNumber] = useState(setIncrement);
  const [news, setNews] = useState(data.items.slice(0, setNumber));
  const stillNews = setNumber >= data.items.length;

  function loadMore() {
    const moreNews = data.items.slice(setNumber, setNumber + setIncrement);
    setSetNumber(setNumber + setIncrement);
    setNews([...news, ...moreNews]);
  }

  return (
    <>
      <div className="newsSection fade-in">
        <h1>Tests les plus récents - www.jeuxactu.com</h1>
        <div className="newsGrid">
          {news.map((article) => (
            <NewsCard key={article.date} article={article} />
          ))}
        </div>
        <div className="d-flex">
          <Button
            disabled={stillNews}
            className="btn-red mx-auto"
            onClick={loadMore}
          >
            Voir plus de tests
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const JVC = "https://www.jeuxactu.com/rss/tests.rss";
  const parser = new Parser();
  const data = await parser.parseURL(JVC);

  return { props: { data } };
}
