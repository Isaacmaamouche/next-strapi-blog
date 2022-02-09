import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Nav, Navbar, Container, Alert } from "react-bootstrap";
// import { strapiContext } from "../utilities/Context";
// Context disabled to lower api call from client side

export default function MyNav() {
  // const { categories } = strapiContext().value;

  // Pour ajouter la class active au menu
  const Path = useRouter().asPath;

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
                  <Link passHref href={`/`}>
                    Acceuil
                  </Link>
                </span>
              </Nav.Item>

              {/* {categories &&
                categories.data.map((category) => (
                  <Nav.Item key={category.id}>
                    <span
                      className={
                        Path.includes(`${category.attributes.cat_id}`)
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Link
                        passHref
                        href={`/categories/${category.attributes.cat_id}`}
                      >
                        {category.attributes.name}
                      </Link>
                    </span>
                  </Nav.Item>
                ))} */}

              <Nav.Item key="all_games">
                <span
                  className={Path == "/games" ? "nav-link active" : "nav-link"}
                >
                  <Link href={`/games`}>Tous les jeux</Link>
                </span>
              </Nav.Item>
              <Nav.Item key="all_categories">
                <span
                  className={
                    Path == "/categories" ? "nav-link active" : "nav-link"
                  }
                >
                  <Link href={`/categories`}>Toutes les catégories</Link>
                </span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
