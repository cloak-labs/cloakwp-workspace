This is a monorepo containing all CloakWP packages/plugins/themes/starters/examples/docs. It is currently under construction as we bring everything into the monorepo. The monorepo was setup using a Turborepo starter template, and probably still has leftover remnants from the template that are yet to be deleted.

## Getting Started
- Clone the repo
- Install pre-requisite software on your machine:
  - `pnpm` (we use it instead of `npm`)
- Follow the [README](./wordpress/backend-starter/README.md) of the WordPress Backend Starter up until the "Install" step (excluding it), then continue below:
- Run `pnpm install` at the root, which basically runs `pnpm install` within each sub-package
- Open the Docker Desktop app on your local machine
- Run `pnpm dev` to build and run everything in development mode -- it runs the `dev` script defined in each sub-package's `package.json`. It spins up the following (which are all linked together):
  - [WordPress Backend Starter](./wordpress/backend-starter/) (http://localhost/wp/wp-admin), using `Docker` (make sure to open the `Docker Desktop` app before running `pnpm dev`)
    - Which installs the CloakWP [Plugin](./plugins/cloakwp-plugin/) + [Themes](./themes/) via local file paths with `Composer`, so you can work on those with real-time updates in the running WP instance
  - [Next.js Front-end Starter](./examples/basic-starter/) (http://localhost:5000)
  - Builds the [CloakWP NPM package](./packages/cloakwp/) in watch mode, which the front-end starter installs locally, meaning you get real-time package updates in the running front-end
  - [CloakWP Docs site](./docs/) (http://localhost:8888)

## Tasks / Roadmap:
See [the GitHub project](https://github.com/orgs/cloak-labs/projects/5/views/1?groupedBy%5BcolumnId%5D=45755579) for a view of the roadmap, or to pick up tasks that are either assigned to you or that aren't assigned yet.

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