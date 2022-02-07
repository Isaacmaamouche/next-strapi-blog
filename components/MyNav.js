import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Nav, Navbar, Container, Alert } from "react-bootstrap";

export default function MyNav() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const Path = useRouter().asPath;

  const [show, setShow] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://fathomless-lake-03373.herokuapp.com/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setData(categories.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (isLoading) return null;
  if (!data) return null;
  return (
    <>
      <Navbar bg="light" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Next/Strapi</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item key="accueil">
                <span className={Path == "/" ? "nav-link active" : "nav-link"}>
                  <Link href={`/`}>Acceuil</Link>
                </span>
              </Nav.Item>

              {data &&
                !isLoading &&
                data.map((category) => (
                  <Nav.Item key={category.id}>
                    <span
                      className={
                        Path.includes(`${category.attributes.cat_id}`)
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link href={`/categories/${category.attributes.cat_id}`}>
                        {category.attributes.name}
                      </Link>
                    </span>
                  </Nav.Item>
                ))}

              <Nav.Item key="all_games">
                <span
                  className={Path == "/games" ? "nav-link active" : "nav-link"}
                >
                  <Link href={`/games`}>Tous les jeux</Link>
                </span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && (
        <Alert
          variant="warning"
          className="myAlert"
          dismissible
          onClose={() => setShow(false)}
        >
          This is not finished yet ! I'm still working daily on this project.
          Come back in a few days !
        </Alert>
      )}
    </>
  );
}
