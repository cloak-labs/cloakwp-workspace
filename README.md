# CloakWP
This is a monorepo containing all CloakWP packages/plugins/themes/starters/examples/docs. It is currently under construction as we bring everything into the monorepo. The monorepo was setup using a Turborepo starter template, and probably still has leftover remnants from the template that are yet to be deleted.

## TODO List:
- [x] Initiate monorepo with Turborepo + Changesets
- [x] Copy in next-wp package, themes, and plugins
- [x] Copy in WP backend-starter and customize `composer.json` + `docker-compose.yml` to install Monorepo plugins/themes via local paths for better local development
- [ ] Copy in our NextJS + CloakWP starter template under the `examples` folder, update it to use the latest `next-wp` version + breaking changes.
- [ ] Adjust the frontend starter to connect to our local backend starter only while in local development (i.e. env.local overrides next-wp config)
- [ ] Split up next-wp into separate package architecture as defined in Notion, update frontend starter's `package.json`
- [ ] Publish new packages to NPM under new scope/name
- [ ] Build `create-cloakwp-app` NPM package which provides `npx` command/script for quickly bootstrapping projects using our frontend + backend starters (see NextJS' `create-next-app` for inspo)
- [ ] Add `src/composer.npx.json` to backend starter (copied from `src/composer.json`) and customize to install plugins/themes from wpackagist; make `create-cloakwp-app` delete the default `composer.json` and rename `composer.npx.json` to `composer.json` when you bootstrap a backend
- [ ] Finish clean-up + separation of two WP plugins
- [ ] Publish WP plugins/theme to wpackagist
- [ ] Figure out best way to bootstrap WP child theme in backend starter only on project initialization (i.e. not a composer dependency)
- [ ] Launch production version of CloakWP demo site; all frontend starters will connect to the demo's WP backend by default
- [ ] Finish this TODO list

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

### Changing the npm organization scope

The npm organization scope for this design system starter is `@acme`. To change this, it's a bit manual at the moment, but you'll need to do the following:

- Rename folders in `packages/*` to replace `acme` with your desired scope
- Search and replace `acme` with your desired scope
- Re-run `pnpm install`

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
