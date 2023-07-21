# Spinup Local WP
Made by the [CloakWP](https://github.com/cloak-labs/cloakwp) team.

Spinup Local WP makes local WordPress development easy for projects using the [Bedrock](https://roots.io/bedrock/) boilerplate by Roots (currently untested with regular WordPress) -- which is designed for developers who want to manage their projects with Git and Composer. It works similarly to how `@wordpress/env` abstracts the complexity of managing your own Docker setup, providing a set of simple commands to magically spin up your local WordPress instance; however, unlike `@wordpress/env`, Spinup Local WP isn't designed to only handle transient dev environments solely for the purpose of testing custom plugins/themes; it is meant to be used alongside your real, version-controlled WordPress instance.

It's an NPM package that acts as an abstraction layer over a typical, best-practice [Docker + Docker Compose](https://docs.docker.com/compose/) setup for WordPress. It includes the following services/features:
  - PHP 8.1,
  - Nginx server,
  - MariaDB (popular MySQL fork),
  - [WP-CLI](https://wp-cli.org/) - the command-line interface for WordPress,
  - [PhpMyAdmin](https://www.phpmyadmin.net/) - free database administration tool
  - [MailHog](https://github.com/mailhog/MailHog) - an email testing tool for developers -- configure your outgoing SMTP server and view your outgoing email in a web UI.

# Getting Started
## Requirements
You must download/install the following:
- Composer
- PHP >= 8.0
- [Docker](https://www.docker.com/get-started) + Docker Compose + Docker Desktop
- NPM
- Node.js

## Install
1. Spin up a new WordPress project using [Bedrock](https://roots.io/bedrock/), via their CLI command `composer create-project roots/bedrock` (already have a WP install? skip to step #4).
2. Run `cd bedrock` to enter the newly created project (and optionally run `code .` to open it in VS Code)
3. Optionally follow the [other steps](https://roots.io/bedrock/docs/installation/) outlined in Bedrock's installation docs
4. Run `npm init` and follow the prompts to generate a `package.json` file
5. Run `npm install @cloakwp/spinup-local-wp`
6. Add the following to your package.json's `scripts`:
  ```json
  "dev": "spinup-local-wp dc up",
  "down": "spinup-local-wp dc down",
  "stop": "spinup-local-wp dc stop",
  "composer": "spinup-local-wp dc run composer",
  "postinstall": "npm run composer create-project",
  "generate-env": "php -r \"copy('.env.example', '.env');\""
  "spinup-local-wp": "spinup-local-wp"
  ```
7. Edit `.env.example` and add/customize this variable: `APP_NAME='enter-project-name'`, and optionally add other env variables, as noted in the [example file here](https://github.com/cloak-labs/cloakwp/blob/feat/localwp/packages/spinup-local-wp/.env.example), to further customize Spinup Local WP's behavior (only necessary if you deviate from the default folder structure). Make sure to always run `npm run generate-env` after modifying `.env.example`, as this will generate the real `.env` file from it.


## Run
- open the Docker Desktop app, 
- from your project root, run:
```shell
npm run dev
``` 
... assuming you configured the `dev` script from above, this will run `spinup-local-wp docker-compose up` for you.
- access your local WordPress instance from http://localhost/wp/wp-admin
- access PhpMyAdmin from http://127.0.0.1:8082/
- access MailHog from http://0.0.0.0:8025/

## Tools

### Update WordPress Core and Composer packages (plugins/themes)

From your project root, run:

```shell
npm run composer update
```
---
### Use WP-CLI

First, login to the WordPress Docker container:

```shell
docker exec -it {my-website}-wordpress bash
```
... replacing {my-website} with the APP_NAME env variable value you set during the "Install" steps above.

Then, run a wp-cli command:

```shell
wp search-replace https://olddomain.com https://newdomain.com --allow-root
```

---
### Useful Docker Commands

Login to the docker container

```shell
docker exec -it {container-name} bash
```

To run Docker Compose commands, use the `spinup-local-wp` command followed by `docker-compose`, or `dc` for short, followed by the Docker Compose command you wish to run (eg. `stop`, `down`, etc.). Examples:

Stop

```shell
spinup-local-wp dc stop
```

Down (stop and remove)

```shell
spinup-local-wp dc down
```

Cleanup

```shell
spinup-local-wp dc rm -v
```

Recreate

```shell
spinup-local-wp dc up -d --force-recreate
```

Rebuild docker container when Dockerfile has changed due to package update

```shell
spinup-local-wp dc up -d --force-recreate --build
```
</details>
