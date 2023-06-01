module.exports = {
  wpUrl: 'http://localhost/', // TODO: change wpUrl
  wpSecret: "8=[OEcY#MImU2YhLe-D1W3Ts1B]-2!-#,m06Lwej", // TODO: match up with secret you're using in your WP theme functions.php
  wpJwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMjMuMjkuMTQ1LjE1MC9-bGlvbmhlYXJ0IiwiaWF0IjoxNjY4MDMyNjIwLCJuYmYiOjE2NjgwMzI2MjAsImV4cCI6NDQ4NjgwMzI2MjAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.uVpRheo1j-SRJlsgerC779UJ5-b1SWboOYzjBUWOTRA", // TODO: swap with your own JWT you create using the "JWT Authentication for WP-API" WP plugin
  postBaseSlugs: { // TODO: consider adding other base slugs for other post types
    post: 'blog/', // prepend all slugs of posts retrieved from WP with "blog/"
  }
}