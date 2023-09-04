# CloakWP Bedrock - Headless WordPress Boilerplate
This is the official WordPress boilerplate for CloakWP (headless WordPress) projects. It's an opinionated, modern approach to WordPress development. However, it isn't a required piece of the CloakWP stack -- you can opt-out and use your own preferred WordPress development stack while still leveraging the other CloakWP tools.

This opinionated starter leverages many modern WordPress development tools:
- [Bedrock](https://roots.io/bedrock/) - a popular WordPress boilerplate with Composer, easier configuration, and an improved folder structure, enabling:
  - Separate configs per environment
  - Environment variables
  - Custom wp-content directory
  - [Composer](https://getcomposer.org/) (a PHP dependency manager) for managing WordPress core, plugins, and themes installation -- enabling better version-control via Git
  - mu-plugins autoloader
  - Enhanced WordPress security (folder structure limits access to non-public files and offers more secure passwords through [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))
  - Gets WordPress 80% of the way towards becoming a proper [Twelve-Factor App](http://12factor.net/)
- [Spinup Local WP](https://github.com/cloak-labs/spinup-local-wp) - another NPM package by the CloakWP team that acts as a simple abstraction layer over [Docker + Docker Compose](https://docs.docker.com/compose/), enabling you to quickly spin up your WordPress site locally while in development with zero effort. It includes the following:
  - PHP 8.1,
  - Nginx server,
  - MariaDB (popular MySQL fork),
  - [WP-CLI](https://wp-cli.org/) - the command-line interface for WordPress,
  - [PhpMyAdmin](https://www.phpmyadmin.net/) - free and open source administration tool for MySQL and MariaDB
  - [MailHog](https://github.com/mailhog/MailHog) - an email testing tool for developers -- configure your outgoing SMTP server and view your outgoing email in a web UI.
- An opinionated collection of WordPress plugins pre-installed that enable/improve the headless WordPress experience, obviously including the CloakWP Plugin and Theme, plus a production-ready child theme with all kinds of goodies related to registering/configuring CPTs, taxonomies, ACF Blocks, and ACF Field Groups via code -- the best-practice way you'll learn to love.

## Requirements
- Composer
- PHP >= 8.0
- [Docker](https://www.docker.com/get-started) + Docker Compose + Docker Desktop
- PNPM
- Node.js

## Installation
cd into your desired installation directory and run:
```bash
composer create-project cloak-labs/cloakwp-bedrock
```

Then run:
```bash
cd cloakwp-bedrock
```

and:
```bash
npm install
```
... which installs [Spinup Local WP](https://github.com/cloak-labs/spinup-local-wp).

Optionally run the following to update your plugins/themes to their latest versions:
```bash
npm run composer update
```
## Configuration
<details>
 <summary>Env Variables</summary>
The Composer install command above will automatically copy the `.env.example` file to a `.env` file that you can now edit.

- Ensure you modify the `APP_NAME` variable for each project, to ensure you don't end up with clashing Docker Containers.
- You may need to modify `VOLUME_WORDPRESS_PATH` if the "run" commands detailed further below don't work. This variable must point to your WordPress installation folder relative to wherever the `spinup-local-wp` node package root is installed; it should work out-of-the-box with NPM, but not with PNPM which installs packages in a different location.
- Optionally adjust the `DB_NAME`, `DB_USER`, and `DB_PASSWORD` variables to be more secure and to match your production environment.
- Modify `.env.local` to override any production variables from `.env` for local development purposes. It is configured by default to cover the required overrides, such as overriding your decoupled front-end's production URL with `http://localhost:5000` via the `CLOAKWP_FRONTEND_URL` variable.

Note: `.env` is gitignored by default, and you likely want to keep it that way to keep your production values secure/secret. So, remember to manually add your `.env` to your production server environment, or build your own solution for automating that (this will likely be the topic of a guide in the future).

</details>

<details>
 <summary>ACF Pro</summary>

It is highly recommended to purchase an Advanced Custom Fields (ACF) Pro license [here](https://www.advancedcustomfields.com/pro/#pricing-table), and install by running:
```bash
npm run composer require wpengine/advanced-custom-fields-pro
```
ACF Pro enables content-modelling features that most headless sites will require, such as repeater fields, ACF blocks, options pages, the gallery field, and more.

Installing ACF Pro via composer requires a couple extra steps, since they need to validate your license. Follow [this article](https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/) to create an `auth.json` file within the CloakWP Bedrock root folder (i.e. alongside `composer.json`).
</details>

## Run
Make sure you open the Docker Desktop app before running the dev command below:

```bash
npm run dev
```

This runs `docker-compose up`, and Docker Compose will now start all the services:

```shell
Starting new-website-mysql    ... done
Starting new-website-composer ... done
Starting new-website-phpmyadmin ... done
Starting new-website-wordpress  ... done
Starting new-website-nginx      ... done
Starting new-website-mailhog    ... done
```

🚀 Open [http://localhost/wp](http://localhost/wp) in your browser to start working with WordPress! Your data will persist across sessions.

## PhpMyAdmin

PhpMyAdmin comes installed as a service in docker-compose.

🚀 Open [http://127.0.0.1:8082/](http://127.0.0.1:8082/) in your browser to log in to and manage your local database.

## MailHog

MailHog comes installed as a service in docker-compose.

🚀 Open [http://0.0.0.0:8025/](http://0.0.0.0:8025/) in your browser

## CLI Tools

[Read more](https://github.com/cloak-labs/cloakwp/tree/feat/localwp/packages/spinup-local-wp) about the CLI tools made available to you via the Spinup Local WP package, such as using the WP-CLI, Composer to add/remove/update plugins & themes, or running Docker commands.