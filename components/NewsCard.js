export default function NewsCard({ article }) {
  return (
    <>
      {article && (
        <div key={article.date} className="newsCard">
          <a href={article.link} target="_blank" rel="noreferrer">
            <img src={article.enclosure.url} width="200" />
            <h2>{article.title}</h2>
          </a>
        </div>
      )}
    </>
  );
}
