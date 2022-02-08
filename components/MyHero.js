import { Button } from "react-bootstrap";
import Image from "next/image";

export default function MyHero() {
  return (
    <div className="container my-5 fade-in">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3">
        <div className="col-lg-4 d-block d-lg-none px-md-5">
          <Image
            className="rounded-3 blockImg kratos"
            src="/assets/img/kratos.png"
            alt="hero banner image"
            width={500}
            height={500}
          />
        </div>

        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1">Your Next Favorite Games</h1>

          <p className="lead">
            {`Ce mini blog a été codé avec Next.js. Les contenus sont récupérés via l'API de Strapi, un CMS Headless que j'hébèrge sur un serveur Heroku.`}
            <br />
            {`Le site utilise l'Incremental Static Regeneration pour mettre à jour les contenus tout en offrant aux utilisateurs la performance et la vitesse d'un site statique.`}
          </p>

          <Button
            className="btn-red btn-lg px-4 fw-bold me-2 mb-2"
            href="https://github.com/Isaacmaamouche/next-strapi-blog"
            target="_blank"
            rel="noreferrer"
          >
            Voir le code sur Github
          </Button>
          <Button
            className="btn-red-outline fw-bold btn-lg px-5 mb-2"
            href="https://strapi.io/"
            target="_blank"
            rel="noreferrer"
          >
            Découvrir Strapi
          </Button>
        </div>

        <div className="col-lg-5 d-none d-lg-block">
          <Image
            className="rounded-3 blockImg kratos"
            src="/assets/img/kratos.png"
            alt="hero banner image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
