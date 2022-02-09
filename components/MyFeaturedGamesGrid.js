import Link from "next/link";
import thumbnailUrlBuilder from "../utilities/thumbnailUrlBuilder";
export default function MyFeaturedGamesGrid({ catName, top3, gamesData }) {
  return (
    <div className="container expandableColumn my-5">
      <div className="left">
        <h1>{catName}</h1>
      </div>
      <div className="right">
        <h2 className="catBestGames">Les mieux notés</h2>
        {top3.map((game) => (
          <div key={game.attributes.game_id} className="item">
            <Link
              href={`/games/${game.attributes.game_id}`}
              alt={game.attributes.name}
              passHref
            >
              <div
                className="bgImg rounded-3"
                style={{
                  backgroundImage:
                    `url('` +
                    thumbnailUrlBuilder(
                      game.attributes.thumbnail.data.attributes.formats
                    ) +
                    `')`,
                }}
              >
                <div className="info">
                  <h2>{game.attributes.name}</h2>
                  <h3>{game.attributes.score}/20</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
