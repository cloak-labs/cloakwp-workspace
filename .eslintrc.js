module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@cloakwp-eslint-config`
  extends: ["cloakwp"],
  settings: {
    next: {
      rootDir: ["examples/*/"],
    },
  },
};
