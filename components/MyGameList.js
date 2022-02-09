import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function MyGameList(props) {
  const { heroTitle, heroText, redButton, redButtonOutline, score, img } =
    props;
  return (
    <div className="container fade-in shadow-sm my-5">
      <div className="row p-lg-4 align-items-center rounded-3">
        <div className="col-lg-4 d-block d-lg-none px-md-5 text-center">
          <Image
            className="rounded-3 blockImg scaleHover"
            src={img}
            alt="hero banner image"
            width={500}
            height={500}
          />
        </div>

        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 pb-2">{heroTitle}</h1>

          <p className="lead">
            {`${score}/20`}
            <br />
            {`${heroText}`}
          </p>

          {redButton && (
            <Link passHref href={redButton} target="_blank" rel="noreferrer">
              <Button className="fw-bold btn-lg mb-2 btn-red">
                Découvrir {heroTitle}
              </Button>
            </Link>
          )}

          {redButtonOutline && (
            <Link
              passHref
              href={redButtonOutline.link}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="fw-bold btn-lg mb-2 btn-red-outline">
                {redButtonOutline.text}
              </Button>
            </Link>
          )}
        </div>

        <div className="col-lg-5 d-none d-lg-block p-5">
          <Image
            className="rounded-3 blockImg scaleHover"
            src={img}
            alt="hero banner image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
