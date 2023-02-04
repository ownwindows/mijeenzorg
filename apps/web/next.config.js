module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true
  },
  env: {
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN
  }
};