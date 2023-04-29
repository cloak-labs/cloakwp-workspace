# next-wp
An NPM package for integrating WordPress into your NextJS front-end.

## Package development with Yalc
This is for next-wp package developers only:
1. Install Yalc globally `npm i yalc -g`
2. `cd next-wp`
3. `yalc publish`
4. Change to parent project folder `cd my-project`
5. `yalc add next-wp`
6. `yalc link next-wp`
7. To push changes made to `next-wp` to your parent project in real-time, run the watcher script `npm run watch`
8. Run `yalc remove next-wp` inside parent project to remove locally linked package

## Environment Variables
```ini
NEXTWP_DEV_URL= # NextJS dev server URL
NEXTWP_PROD_URL= # NextJS prod server URL
WORDPRESS_GRAPH_API= # Wordpress GraphQL endpoint
WORDPRESS_REST_API= # Wordpress Rest API endpoint
CUSTOM_NEXT_WP_CONFIG_PATH= # Set a custom path to configuration file
```