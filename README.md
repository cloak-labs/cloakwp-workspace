# CloakWP Workspace
This is a repo for CloakWP developers and open-source contributors, so this README is geared towards them, not CloakWP end-users. If you're a CloakWP end-user, you're likely looking for one of the following CloakWP tools/projects:
- [CloakWP.js](https://github.com/cloak-labs/cloakwp-js)
- [CloakWP Plugin](https://github.com/cloak-labs/cloakwp-plugin)
- [CloakWP Base Theme](https://github.com/cloak-labs/cloakwp-base-theme)
- [CloakWP Bedrock](https://github.com/cloak-labs/cloakwp-bedrock)
- [Spinup Local WP](https://github.com/cloak-labs/spinup-local-wp)
- [CloakWP Inception - WP Theme](https://github.com/cloak-labs/cloakwp-inception-theme)
- [CloakWP Inception - Next.js](https://github.com/cloak-labs/cloakwp-inception-nextjs)

If you are looking to contribute to the CloakWP open-source ecosystem, welcome! You're in the right place.

---

This is a meta-repo. It pulls in the standalone repos of all the tools listed above. If you're unfamiliar with meta-repos (i.e. the concept of combining the multi-repo and mono-repo approach, otherwise known as multi-monorepo architecture), we suggest starting by checking out the following:

- [Mono-repo or multi-repo? Why choose one, when you can have both?](https://patrickleet.medium.com/mono-repo-or-multi-repo-why-choose-one-when-you-can-have-both-e9c77bd0c668)
- [Meta](https://github.com/mateodelnorte/meta) - the tool we use to pull in many standalone repos into a single meta-repo for development purposes.

Thanks to the meta-repo approach to organizing our code, we're able to decouple development from distribution. Meaning, we get the benefits of a monorepo for local development (i.e. modify multiple interconnected packages with real-time testing of your changes in a project), with the benefits of a multi-repo approach regarding package distribution and end-user consumption (i.e. separate Github repos enable easier package deployment pipelines, better issue searching/management, better project discoverability, better separation of concerns, usage of template repositories vs. needing to build a CLI scaffolding tool, etc.).

Other tools used by this meta-repo include: 
- [Turborepo](https://turbo.build): Turbo takes care of building/running all nested packages, in an optimized fashion.
- [PNPM](https://pnpm.io/): an NPM alternative that's faster and saves disk space
  - Installation instructions: https://pnpm.io/installation
- [Studio](https://github.com/franzliedke/studio): for symlinking local Composer packages (eg. WP plugins/themes) rather than installing from Packagist, without having to change composer.json
- [BrowserSync](https://browsersync.io/): enables browser hot reloading in places that don't already support it, such as when editing our WordPress plugins/themes, etc.

## Getting Started

### 1. Install Meta
Before cloning this repo, install `meta` globally:
```bash
npm i -g meta
```

Clone this repo using Meta (rather than the usual `git clone`):
```bash
meta git clone git@github.com:cloak-labs/cloakwp-workspace.git
```
`meta` will clone this meta repo and all child repositories at once.

---
### 2. Env variables
TBD...

---
### 3. Install
Install node_modules in all nested Node projects/packages:
```bash
pnpm install
```

---
### 4. Run
First, open your Docker Desktop application; then run:
```bash
pnpm dev
```
Note: check out the `dev` script in the root `package.json` and notice the `--filter` arguments. These tell Turbo to build all CloakWP packages, but only one example project (i.e. one WordPress instance + Next.js frontend); to test another example project, modify these filters accordingly and run `pnpm dev` again.

## More concepts

### Dogfooding Local Composer Packages
We use a tool called [Studio](https://github.com/franzliedke/studio) to make our WordPress instances in this repo pull in the local versions of our Composer packages (i.e. WP plugins/themes) instead of the versions hosted on Packagist. This allows us to develop our themes/plugins while we dogfood them, **but without needing to change our composer.json file**; this last point is crucial, since we're developing templates to be used by others which need their composer.json files to pull from Packagist. Without Studio, we'd have to modify composer.json while in local development to use Path Repositories to pull in our local packages, and then try to remember not to commit/push those composer.json changes (prone to human error obviously).

Typically you would install `studio` globally on your machine, but since we run our local WordPress instances in Docker, we need to install it as a composer dependency in each WordPress instance, so that it's available in the Docker environment.

The first two steps below are already done for you on existing example projects, so you only need to follow these when creating new example projects.

1. Install `studio` as project dependency:
```bash
cd examples/inception/backend # or whatever project you're working on
npm run composer require --dev franzl/studio 
```

2. Now, simply add a `studio.json` file in the WP root (alongside `composer.json`) with these contents:
```bash
{
  "version": 2,
  "paths": [
    "../local-packages/*"
  ]
}
```

3. Then, add the following to `.env` in the WP root to tell Spinup Local WP to mount our local composer packages into our Docker containers (adjust the path if necessary to point to the local directory containing all composer packages -- path is relative to Spinup Local WP's root):
```bash
VOLUME_LOCAL_PACKAGES_PATH='../../composer/'
```

4. And finally, tell Studio to set up the symlinks (you might first need to re-run `pnpm dev` from the workspace root so that the Docker containers are running):
```bash
npm run composer update
```
If all goes well, you should now see a brief message along the following as part of Composer's output:

> [Studio] Loading path installer

This is what will happen under the hood:

  1. Composer begins checking dependencies for updates.
  2. Studio jumps in and informs Composer to prefer packages from the directories listed in the studio.json file over downloading them from Packagist.
  3. Composer symlinks these packages into the vendor directory or any other appropriate place (e.g. for custom installers). Thus, to your application, these packages will behave just like "normal" Composer packages.
  4. Composer generates proper autoloading rules for the Studio packages.
  5. For non-Studio packages, Composer works as always.

