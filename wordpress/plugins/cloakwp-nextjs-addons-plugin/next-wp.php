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
 * @package           Next_Wp
 *
 * @wordpress-plugin
 * Plugin Name:       NextWP
 * Plugin URI:        https://https://github.com/cloak-labs/next-wp-plugin
 * Description:       Base plugin for Next-WP configuration
 * Version:           0.6.0
 * Author:            Cloak Labs
 * Author URI:        https://https://github.com/cloak-labs
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       next-wp
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 0.6.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'NEXT_WP_VERSION', '0.6.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-next-wp-activator.php
 */
function activate_next_wp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-next-wp-activator.php';
	Next_Wp_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-next-wp-deactivator.php
 */
function deactivate_next_wp() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-next-wp-deactivator.php';
	Next_Wp_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_next_wp' );
register_deactivation_hook( __FILE__, 'deactivate_next_wp' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-next-wp.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.6.0
 */
function run_next_wp() {

	$plugin = new Next_Wp();
	$plugin->run();

}
run_next_wp();
