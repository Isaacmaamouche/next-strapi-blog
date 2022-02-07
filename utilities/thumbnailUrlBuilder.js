export default function thumbnailUrlBuilder(path) {
  let server = "https://fathomless-lake-03373.herokuapp.com";

  if (path.large) {
    return server + path.large.url;
  } else {
    return server + path.small.url;
  }
}
