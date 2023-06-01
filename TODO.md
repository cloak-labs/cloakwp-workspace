Ultimate goal of this monorepo: clone it and run a single build command that:
  1. spins up a WP instance with our plugins/themes pre-installed via local paths (so local edits to the plugins/themes get immediately reflected on save)
  2. spins up one (or maybe more in future) NextJS demo site with our CloakWP npm packages locally installed and pre-configured to pull from the locally running WP instance (so changes to CloakWP packages will immediately get reflected in the demo site on save)
  3. spins up our docs site so we can add to it with live preview as we develop changes to the packages etc.

This reduces a ton of friction and makes it way easier and more productive to work on CloakWP's multiple packages/plugins/themes/demos/docs, compared to the current fragmented repo approach.

Turborepo makes those builds easier and faster.

We also leverage Changesets to standardize and automate our changelog management, version bumping, GitHub releases, and NPM registry publishing.

TODOs:
[ ] Add 'init' scripts to all packages and set up Turbo so that running `pnpm init` runs all those scripts -- useful when cloning and setting up the repo locally for first time.