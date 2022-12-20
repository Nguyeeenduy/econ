const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [process.env.BASE_URL_IMAGE],
  },
  env: {
    URL: process.env.URL,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_V2: process.env.BASE_URL_V2,
  },
  trailingSlash: true,
  i18n: {
    locales: ["vi"],
    defaultLocale: "vi",
  },
};
