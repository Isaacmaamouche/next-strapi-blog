const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
