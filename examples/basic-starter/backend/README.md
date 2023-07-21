# CloakWP WordPress Backend Starter
This is the official WordPress backend starter for CloakWP (headless WordPress) projects. It's an opinionated, modern approach to WordPress development. However, it isn't a required piece of the CloakWP stack -- you can opt-out and use your own preferred WordPress development stack while still leveraging the CloakWP Plugin + NPM package + front-end starter.

This opinionated starter leverages many modern WordPress development tools:
- [Bedrock](https://roots.io/bedrock/) - a popular WordPress boilerplate with Composer, easier configuration, and an improved folder structure, enabling:
  - Separate configs per environment
  - Environment variables
  - Custom wp-content directory
  - [Composer](https://getcomposer.org/) (a PHP dependency manager) for managing WordPress core, plugins, and themes installation -- enabling better version-control via Git
  - mu-plugins autoloader
  - Enhanced WordPress security (folder structure limits access to non-public files and offers more secure passwords through [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))
  - Gets WordPress 80% of the way towards becoming a proper [Twelve-Factor App](http://12factor.net/)
- [Spinup Local WP](https://github.com/cloak-labs/cloakwp/tree/feat/localwp/packages/spinup-local-wp) - another NPM package by the CloakWP team that acts as a simple abstraction layer over [Docker + Docker Compose](https://docs.docker.com/compose/), enabling you to quickly spin up your WordPress site locally while in development with zero effort. It includes the following:
  - PHP 8.1,
  - Nginx server,
  - MariaDB (popular MySQL fork),
  - [WP-CLI](https://wp-cli.org/) - the command-line interface for WordPress,
  - [PhpMyAdmin](https://www.phpmyadmin.net/) - free and open source administration tool for MySQL and MariaDB
  - [MailHog](https://github.com/mailhog/MailHog) - an email testing tool for developers -- configure your outgoing SMTP server and view your outgoing email in a web UI.
- An opinionated collection of WordPress plugins pre-installed that enable/improve the headless WordPress experience, obviously including the CloakWP Plugin and Theme, plus a production-ready child theme with all kinds of goodies related to registering/configuring CPTs, taxonomies, ACF Blocks, and ACF Field Groups via code -- the best-practice way you'll learn to love.

## Instructions

<details>
 <summary>Requirements</summary>

- Composer
- PHP >= 8.0
- [Docker](https://www.docker.com/get-started) + Docker Compose + Docker Desktop
- PNPM
- Node.js

</details>

<details>
 <summary>Env Variables</summary>

Edit `.env.example` to your needs (there are many comments explaining things). During the `composer create-project` command described below (which also gets run automatically when you run `pnpm install` from the project root), a `.env` will automatically be created from `.env.example` -- so it's important to treat `.env.example` as the source of truth.

</details>

<details>
 <summary>ACF Pro</summary>

 It is highly recommended to purchase an Advanced Custom Fields (ACF) Pro license [here](https://www.advancedcustomfields.com/pro/#pricing-table), as this enables content-modelling features that most headless sites will require, such as repeater fields, ACF blocks, options pages, the gallery field, and more.

 Installing ACF Pro via composer requires a couple extra steps, since they need to validate your license. Follow [this article](https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/) to create an `auth.json` file within the root backend folder (i.e. alongside `composer.json`).
</details>

<details>
 <summary>Install</summary>
Run the following at the project root:

```shell
pnpm install
```
Or alternatively, cd into the root of the backend folder and manually run:

```shell
pnpm composer create-project
```
The former simply runs the latter for you, but from the monorepo root.

</details>

<details>
 <summary>Run</summary>

```shell
pnpm dev
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

🚀 Open [http://localhost](http://localhost) in your browser

## PhpMyAdmin

PhpMyAdmin comes installed as a service in docker-compose.

🚀 Open [http://127.0.0.1:8082/](http://127.0.0.1:8082/) in your browser

## MailHog

MailHog comes installed as a service in docker-compose.

🚀 Open [http://0.0.0.0:8025/](http://0.0.0.0:8025/) in your browser

</details>
<details>
 <summary>Tools</summary>

[Read more](https://github.com/cloak-labs/cloakwp/tree/feat/localwp/packages/spinup-local-wp) about the CLI tools made available to you via the Spinup Local WP package, such as using WP-CLI, or running Docker/Composer commands. 
</details>