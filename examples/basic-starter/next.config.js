/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: [ // TODO: change allowed image domains
      '23.29.145.150',
      'http://23.29.145.150',
      'http://23.29.145.150/~lionheart',
      'localhost',
    ],
  },
}
