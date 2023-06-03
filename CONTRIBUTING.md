This is a monorepo containing all CloakWP packages/plugins/themes/starters/examples/docs. It is currently under construction as we bring everything into the monorepo. The monorepo was setup using a Turborepo starter template, and probably still has leftover remnants from the template that are yet to be deleted.

## Getting Started
- Clone the repo
- Install pre-requisite software on your machine:
  - `pnpm` (we use it instead of `npm`)
- Follow the [README](./wordpress/backend-starter/README.md) of the WordPress Backend Starter up until the "Install" step, then continue below:
- Run `pnpm install` at the root, which basically runs `pnpm install` within each sub-package
- Open the Docker Desktop app on your local machine
- Run `pnpm dev` to build and run everything in development mode -- it runs the `dev` script defined in each sub-package's `package.json`. It spins up the following (which are all linked together):
  - [WordPress Backend Starter](./wordpress/backend-starter/) (http://localhost/wp/wp-admin), using `Docker` (make sure to open the `Docker Desktop` app before running `pnpm dev`)
    - Which installs the CloakWP [Plugin](./wordpress/plugins/cloakwp-plugin/) + [Themes](./wordpress/themes/) via local file paths with `Composer`, so you can work on those with real-time updates in the running WP instance
  - [Next.js Front-end Starter](./examples/basic-starter/) (http://localhost:5000)
  - Builds the [CloakWP NPM package](./packages/cloakwp/) in watch mode, which the front-end starter installs locally, meaning you get real-time package updates in the running front-end
  - [CloakWP Docs site](./docs/) (http://localhost:8888)

## TODO List:
- [x] Initiate monorepo with Turborepo + Changesets
- [x] Copy in cloakwp package, themes, and plugins
- [x] Copy in WP backend-starter and customize `composer.json` + `docker-compose.yml` to install Monorepo plugins/themes via local paths for better local development
- [x] Copy in our NextJS + CloakWP starter template under the `examples` folder, update it to use the latest `cloakwp` version + breaking changes.
- [x] Adjust the frontend starter to connect to our local backend starter only while in local development (i.e. env.local overrides cloakwp config)
- [x] Combine both our WP plugins and add /menus + /frontpage API Endpoints
- [x] Convert non-hook "use" functions on cloakwp package to "get"
- [x] Add `getMenus` function to cloakwp package that pings our new /menus endpoint
- [ ] Optimize cloakwp package + plugins more while building out front-end starter; starter needs to be more barebones, generic, and up-to-date with latest best practices
- [ ] Add drop-in SEO component/solution to cloakwp (integrate with Yoast)
- [ ] Add sitemap solution into cloakwp package
- [ ] Add robots.txt example to front-end starter
- [ ] Add preview 
- [ ] Add drop-in API resolver function to cloakwp that enables a single API route to handle all CloakWP routes
- [ ] Next config wrapper that adds in webpack config for Gutenberg iFrame preview feature -- beta version on Vanguard site needs to be copied over and finished
- [ ] Move as much functionality from themes into plugin, and design best structure for registering CPTs, Taxonomies, ACF Blocks, ACF Field Groups, etc. (hint: use Extended ACF and Extended CPTs)
- [ ] Build PHP solution for disabling unneeded Gutenberg blocks, using filter hook to customize?
- [ ] Add more useful filter/action hooks throughout WP plugin
- [ ] Split up cloakwp into separate package architecture as defined in Notion, update frontend starter's `package.json`
- [ ] Publish new packages to NPM under new scope/name
- [ ] Build `create-cloakwp-app` NPM package which provides `npx` command/script for quickly bootstrapping projects using our frontend + backend starters (see NextJS' `create-next-app` for inspo)
- [ ] Add `src/composer.npx.json` to backend starter (copied from `src/composer.json`) and customize to install plugins/themes from wpackagist; make `create-cloakwp-app` delete the default `composer.json` and rename `composer.npx.json` to `composer.json` when you bootstrap a backend
- [ ] Publish WP plugins/theme to wpackagist
- [ ] Figure out best way to bootstrap WP child theme in backend starter only on project initialization (i.e. not a composer dependency)
- [ ] Launch production version of CloakWP demo site; all frontend starters will connect to the demo's WP backend by default
- [ ] Build + write docs, covering all packages/plugins/starters etc.

## Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Useful commands

- `pnpm build` - Build all packages and the docs site
- `pnpm dev` - Develop all packages and the docs site
- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

> TODO: update the below items with more detail -- the following is the default explainer text from the Turbo starter:

## Versioning and Publishing packages

Package publishing has been configured using [Changesets](https://github.com/changesets/changesets). Please review their [documentation](https://github.com/changesets/changesets#documentation) to familiarize yourself with the workflow.

This example comes with automated npm releases setup in a [GitHub Action](https://github.com/changesets/action). To get this working, you will need to create an `NPM_TOKEN` and `GITHUB_TOKEN` in your repository settings. You should also install the [Changesets bot](https://github.com/apps/changeset-bot) on your GitHub repository as well.

For more information about this automation, refer to the official [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md)

### npm

If you want to publish package to the public npm registry and make them publicly available, this is already setup.

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```

### GitHub Package Registry

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package-using-publishconfig-in-the-packagejson-file)