import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function MyCardGridGames({ data }) {
  const sortedData = data.sort((a, b) => {
    return a.attributes.name - b.attributes.name;
  });

  return (
    <>
      <div className="myGrid my-5">
        {sortedData.map((game) => (
          <>
            <Card key={game.id} className="shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/100x100"
              />
              <Card.Body className="cardBodyJustifyEnd">
                <div className="mb-4">
                  <Card.Title>{game.attributes.name}</Card.Title>
                  <Card.Text>{game.attributes.score}/20</Card.Text>
                  <Card.Text>{game.attributes.description}</Card.Text>
                </div>
                <Link
                  href={"/games/" + game.attributes.game_id}
                  className="d-block btn-red-outline"
                  passHref
                >
                  Décrouvrir {game.attributes.name}
                </Link>
              </Card.Body>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
