import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import thumbnailUrlBuilder from "../utilities/thumbnailUrlBuilder";

export default function MySquareGridGames({ data }) {
  const sortedData = data.sort((a, b) => {
    let fa = a.attributes.name.toLowerCase();
    let fb = b.attributes.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  function shortenDesc(string) {
    let shortDesc = string.split(" ").slice(0, 15);
    shortDesc.push("...");
    let shortened = shortDesc.join(" ");
    return shortened;
  }

  return (
    <>
      <div className="myGrid my-5">
        {sortedData.map((game) => (
          <>
            <Card key={game.id + "shadow"} className="shadow-sm fade-in">
              <div className="hoverShadow">
                <Card.Img
                  variant="top"
                  src={thumbnailUrlBuilder(
                    game.attributes.thumbnail.data.attributes.formats
                  )}
                />
              </div>
              <Card.Body className="cardBodyJustifyEnd hoverBody">
                <div className="mb-2">
                  <Card.Title>{game.attributes.name}</Card.Title>
                  <Card.Text>
                    {game.attributes.score}/20
                    <br />
                    {shortenDesc(game.attributes.description)}
                  </Card.Text>
                </div>
                <Link href={"/games/" + game.attributes.game_id}>
                  <Button className="btn-red">
                    Décrouvrir {game.attributes.name}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
