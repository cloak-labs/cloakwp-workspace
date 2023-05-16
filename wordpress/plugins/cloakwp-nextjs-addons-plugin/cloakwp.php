<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://https://github.com/cloak-labs
 * @since             0.6.0
 * @package           CloakWP
 *
 * @wordpress-plugin
 * Plugin Name:       CloakWP - NextJS Addons
 * Plugin URI:        https://https://github.com/cloak-labs/cloakwp-plugin
 * Description:       Adds NextJS specific utilities to the CloakWP Plugin.
 * Version:           0.6.0
 * Author:            Cloak Labs
 * Author URI:        https://https://github.com/cloak-labs
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cloakwp
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Current plugin version.
 * Start at version 0.6.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CLOAKWP_VERSION', '0.6.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cloakwp-activator.php
 */
function activate_cloakwp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cloakwp-activator.php';
	CloakWP_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cloakwp-deactivator.php
 */
function deactivate_cloakwp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cloakwp-deactivator.php';
	CloakWP_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_cloakwp' );
register_deactivation_hook( __FILE__, 'deactivate_cloakwp' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-cloakwp.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.6.0
 */
function run_cloakwp() {

	$plugin = new CloakWP();
	$plugin->run();

}
run_cloakwp();
