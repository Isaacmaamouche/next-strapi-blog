export default function thumbnailUrlBuilder(path) {
  if (path.large) return path.large.url;
  if (path.small) return path.small.url;
}
