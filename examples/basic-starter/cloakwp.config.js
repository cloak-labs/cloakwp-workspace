module.exports = {
  sources: [
    {
      key: "default",
      url: process.env.WP_URL_1,
      secret: process.env.WP_SECRET_1,
      jwt: process.env.WP_JWT_1,
      adminPath: "wp/wp-admin",
      postBaseSlugs: {
        post: 'blog/', // prepend all slugs of posts retrieved from WP with "blog/"
      }
    }
  ],
  wpUrl: 'http://localhost/', // TODO: change wpUrl
  wpSecret: "8dOEcYMImU2YhLeD1W3Ts1B2!m06Lwej", // TODO: match up with secret you're using in your WP theme functions.php
  wpJwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwIiwiaWF0IjoxNjg2MDI3MTU3LCJuYmYiOjE2ODYwMjcxNTcsImV4cCI6MTY4NjYzMTk1NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.RvFFeFeNO9_tsf4ZO1ZpPvpmGUozSw-_WtFKq5dvH7o", // TODO: swap with your own JWT you create using the "JWT Authentication for WP-API" WP plugin
  adminPath: "wp/wp-admin",
  postBaseSlugs: { // TODO: consider adding other base slugs for other post types
    post: 'blog/', // prepend all slugs of posts retrieved from WP with "blog/"
  }
}