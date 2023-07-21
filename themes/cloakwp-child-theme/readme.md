# CloakWP Child Theme
This is a [CloakWP](https://github.com/cloak-labs/cloakwp) child theme (intended to be used alongside the CloakWP parent theme, plugin, and NPM package -- a suite of tools for headless WordPress development) that comes with many commonly used ACF Blocks, Field Groups, Custom Post Types, and Custom Taxonomies out-of-the-box -- all of which is defined in PHP for optimal version-controlling and dev ops (leveraging the wonderful [ExtendedACF](https://github.com/vinkla/extended-acf) and [ExtendedCPTs](https://github.com/johnbillion/extended-cpts) packages). It also includes a `theme.json` example for customizing your Gutenberg theme/settings, and enqueues a custom stylesheet and JS file for further customization of the Gutenberg editor.  

The goal of this theme is to speed up the initial scaffolding of your headless WordPress project, while serving as an example for optimal WordPress content modelling using code-as-configuration.

Make sure to:
- Modify the Gutenberg theme customizations in `theme.json` (add your own color palette, font sizes, and other Gutenberg feature preferences). The default configuration leans heavily towards stripping down the available editing capabilities.
- Modify the default blocks, fields, CPTs, and taxonomies to fit your project 

This theme is ideally used in conjunction with the [CloakWP NPM package](https://github.com/kaelansmith/cloakwp) and its corresponding [CloakWP WordPress plugin](https://github.com/Stikky-Media/cloakwp-plugins/).