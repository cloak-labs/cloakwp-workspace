module.exports = {
  sources: {
    default: {
      url: process.env.WP_URL_1,
      secret: process.env.WP_SECRET_1,
      jwt: process.env.WP_JWT_1,
      adminPath: "wp/wp-admin",
      contentPath: "app" // defaults to "wp-content"
    },
    // oldWordPress: {
    //   url: process.env.WP_URL_2,
    //   secret: process.env.WP_SECRET_2,
    //   jwt: process.env.WP_JWT_2,
    //   adminPath: "wp/wp-admin",
    // },
  },
}