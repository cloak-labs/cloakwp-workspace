# CloakWP WordPress Backend Starter
This is the official WordPress backend starter for CloakWP (headless WordPress) projects. It uses Docker Compose to spin up a local WP instance with all kinds of goodies, sensible defaults, and optimizations for headless WordPress projects. You can easily deploy your WP instance to production, leveraging Git and modern CI/CD workflows.

This opinionated starter leverages many modern WordPress development tools:
- [Bedrock](https://roots.io/bedrock/) - a popular WordPress boilerplate with Composer, easier configuration, and an improved folder structure, enabling:
  - Separate configs per environment
  - Environment variables
  - Custom wp-content directory
  - [Composer](https://getcomposer.org/) (a PHP dependency manager) for managing WordPress core, plugins, and themes installation -- enabling better Git integration
  - mu-plugins autoloader
  - Enhanced WordPress security (folder structure limits access to non-public files and offers more secure passwords through [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))
  - Gets WordPress 80% of the way towards becoming a proper [Twelve-Factor App](http://12factor.net/)
- [Docker + Docker Compose](https://docs.docker.com/compose/) for quickly spinning up your WordPress site locally in a consistent environment closely matching your production environment. It includes the following services and configuration options:
  - PHP 8.1 (you have control over the version)
  - Custom PHP `php.ini` config in `./config`
  - Nginx server (custom config in `./nginx`),
  - MariaDB (popular MySQL fork),
  - [WP-CLI](https://wp-cli.org/) - WP-CLI is the command-line interface for WordPress.
  - [PhpMyAdmin](https://www.phpmyadmin.net/) - free and open source administration tool for MySQL and MariaDB (PhpMyAdmin config in `./config`)
  - [MailHog](https://github.com/mailhog/MailHog) - an email testing tool for developers -- configure your outgoing SMTP server and view your outgoing email in a web UI.
- An opinionated collection of WordPress plugins pre-installed that enable/improve the headless WordPress experience, obviously including the CloakWP Plugin and Theme, plus a production-ready child theme with all kinds of goodies related to registering/configuring CPTs, taxonomies, ACF Blocks, and ACF Field Groups via code -- the best-practice way.

## Instructions

<details>
 <summary>Requirements</summary>

+ [Docker](https://www.docker.com/get-started)

</details>

<details>
 <summary>Env Variables</summary>

Both step 1. and 2. below are required:

#### 1. For Docker (required step)

Copy `.env.example` in the project root to `.env` and edit your preferences.

Example:

```dotenv
# DOCKER ENVIRONMENT VARIABLES
# ----------------------------

# change the following to be unique for your project:
APP_NAME=my-website
DOMAIN=localhost:80
DB_ROOT_PASSWORD=db_root_password
DB_TABLE_PREFIX=wp_

# make sure DB_NAME is the same name you use for your production DB
DB_NAME=my-website

# add a non-root DB user with the same credentials as your production DB's user -- if you experience a DB connection error, you can test whether these creds are working by running `docker compose up`, and logging into PHPMyAdmin at http://127.0.0.1:8082/
DB_USER=db_username
DB_PASSWORD=db_password

# leave the following as-is unless you know what you're doing
IP=127.0.0.1
DB_HOST=mysql
```

#### 2. For WordPress (required step)

Edit `./src/.env.example` to your needs. During the `composer create-project` command described below (which also gets run automatically when you run `pnpm install` from the root), a `./src/.env` will be created from your `./src/.env.example`.

Example:

```dotenv
# Make sure the following DB credentials work with your Docker MySQL and your web host's DB instance (or provide custom creds specifically for Docker in .env.local)
DB_NAME='my-website'
DB_USER='db_username'
DB_PASSWORD='db_password'

# Optionally, you can use a data source name (DSN)
# When using a DSN, you can remove the DB_NAME, DB_USER, DB_PASSWORD, and DB_HOST variables
# DATABASE_URL='mysql://database_user:database_password@database_host:database_port/database_name'

# Optional variables
DB_HOST='localhost'
# DB_PREFIX='wp_'

# Note: leave this as "production", and create .env.local file with WP_ENV='development' in order for Docker to run in development mode
WP_ENV='production'

# Add your production URL below, and use .env.local to override with your local Docker URL while working locally
WP_HOME='https://my-website.com'
WP_SITEURL="${WP_HOME}/wp"

WP_DEBUG_LOG='/debug.log'

# Configuration options for the CloakWP Plugin (update .env.local for local development overrides):
CLOAKWP_FRONTEND_URL='https://demo.cloakwp.com'
CLOAKWP_PREVIEW_SECRET='8=[OEcY#MImU2YhLe-D1Wwetg1B]-2!-#,m06Lwej'
CLOAKWP_ENABLE_DEV_MODE=false
CLOAKWP_ENABLE_ISR=true
CLOAKWP_OVERRIDE_VIEW_POST_LINK=true
CLOAKWP_OVERRIDE_PREVIEW_POST_LINK=true
CLOAKWP_YOAST_USE_FRONTEND_URL=true
CLOAKWP_ENABLE_FAVICON=true
CLOAKWP_JWT_NO_EXPIRY=true
CLOAKWP_ENABLE_PREVIEW_POST=true

# Optionally customize your frontend's CloakWP-related API routes (if different than the defaults):
# CLOAKWP_PREVIEW_API_ROUTE=
# CLOAKWP_REVALIDATE_API_ROUTE=
# CLOAKWP_LOGIN_API_ROUTE=
# CLOAKWP_LOGOUT_API_ROUTE=

# For certain web hosts, like SpinupWP, you should disable WP cron in favour of the host's own cron solution
# DISABLE_WP_CRON=true

# Generate your own unique keys here: https://roots.io/salts.html
AUTH_KEY='generateme'
SECURE_AUTH_KEY='generateme'
LOGGED_IN_KEY='generateme'
NONCE_KEY='generateme'
AUTH_SALT='generateme'
SECURE_AUTH_SALT='generateme'
LOGGED_IN_SALT='generateme'
NONCE_SALT='generateme'
```

</details>

<details>
 <summary>ACF Pro</summary>

 It is highly recommended to purchase an Advanced Custom Fields (ACF) Pro license [here](https://www.advancedcustomfields.com/pro/#pricing-table), as this enables content-modelling features that most headless sites will require, such as repeater fields, ACF blocks, options pages, the gallery field, and more.

 Installing ACF Pro via composer requires a couple extra steps, since they need to validate your license. Follow [this article](https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/) to create an `auth.json` file within the `src` folder of your WordPress instance.
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
Starting my-website-mysql    ... done
Starting my-website-composer ... done
Starting my-website-phpmyadmin ... done
Starting my-website-wordpress  ... done
Starting my-website-nginx      ... done
Starting my-website-mailhog    ... done
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

----
### Update WordPress Core and Composer packages (plugins/themes)

First, cd into the backend root (where the Dockerfile lives), then run:

```shell
pnpm composer update
```
---
### Use WP-CLI

First, login to the container:

```shell
docker exec -it my-website-wordpress bash
```
... where `my-website-wordpress` is the name of your WordPress Docker container/service.

Then, run a wp-cli command:

```shell
wp search-replace https://olddomain.com https://newdomain.com --allow-root
```

> You can use this command after you've installed WordPress using Composer (see example above).
---
### Update plugins and themes from wp-admin?

You can, but I recommend to use Composer for this only. But to enable this edit `./src/config/environments/development.php` (for example to use it in Dev)

```shell
Config::define('DISALLOW_FILE_EDIT', false);
Config::define('DISALLOW_FILE_MODS', false);
```
---
### Useful Docker Commands

When making changes to the Dockerfile, use:

```bash
docker-compose up -d --force-recreate --build
```

Login to the docker container

```shell
docker exec -it my-website-wordpress bash
```

Stop

```shell
docker-compose stop
```

Down (stop and remove)

```shell
docker-compose down
```

Cleanup

```shell
docker-compose rm -v
```

Recreate

```shell
docker-compose up -d --force-recreate
```

Rebuild docker container when Dockerfile has changed

```shell
docker-compose up -d --force-recreate --build
```
</details>
