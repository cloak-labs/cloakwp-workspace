# CloakWP Workspace
This is a meta-repo for CloakWP developers/contributors, so this README is geared towards them, not CloakWP end-users. If you're a CloakWP end-user, you're likely looking for one of the following CloakWP tools/projects:
- [CloakWP.js](https://github.com/cloak-labs/cloakwp-js)
- [CloakWP Plugin](https://github.com/cloak-labs/cloakwp-plugin)
- [CloakWP Base Theme](https://github.com/cloak-labs/cloakwp-base-theme)
- [CloakWP Bedrock](https://github.com/cloak-labs/cloakwp-bedrock)
- [Spinup Local WP](https://github.com/cloak-labs/spinup-local-wp)
- [CloakWP Inception - WP Theme](https://github.com/cloak-labs/cloakwp-inception-theme)
- [CloakWP Inception - Next.js](https://github.com/cloak-labs/cloakwp-inception-nextjs)

If you're looking to contribute to the CloakWP open-source ecosystem, welcome! You're in the right place.

If you're unfamiliar with meta-repos (i.e. the concept of combining the multi-repo and mono-repo approach, otherwise known as multi-monorepo architecture), we suggest starting by checking out the following:

- [Mono-repo or multi-repo? Why choose one, when you can have both?](https://patrickleet.medium.com/mono-repo-or-multi-repo-why-choose-one-when-you-can-have-both-e9c77bd0c668)
- [Meta](https://github.com/mateodelnorte/meta) - the tool we use to pull in many standalone repos into a single meta-repo for development purposes.

Thanks to the meta-repo approach to organizing our code, we're able to decouple development from distribution. Meaning, we get the benefits of a monorepo for local development (i.e. modify multiple interconnected packages with real-time testing of your changes in a project), with the benefits of a multi-repo approach regarding package distribution and end-user consumption (i.e. separate Github repos enable easier package deployment pipelines, better issue searching/management, better project discoverability, better separation of concerns, usage of template repositories vs. needing to build a CLI scaffolding tool, etc.).

Other tools used by this meta-repo include: 
- [Turborepo](https://turbo.build): Turbo takes care of building/running all nested packages, in an optimized fashion.
- [PNPM](https://pnpm.io/): an NPM alternative that's faster and saves disk space
  - Installation instructions: https://pnpm.io/installation
- BrowserSync: enables browser hot reloading in places that don't already support it, such as when editing our WordPress plugins, themes, etc.

## Get Started
Install `meta` globally:
```bash
npm i -g meta
```

Clone this repo using Meta (rather than the usual `git clone`):
```bash
meta git clone git@github.com:cloak-labs/cloakwp-workspace.git
```
`meta` will clone this meta repo and all child repositories at once.