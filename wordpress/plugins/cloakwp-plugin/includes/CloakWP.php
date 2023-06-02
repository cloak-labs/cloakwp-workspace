<?php

namespace CloakWP;

use CloakWP\General\i18n;
use CloakWP\General\PluginLoader;
use CloakWP\Admin\Admin;
use CloakWP\API\BlockTransformer;
use CloakWP\API\Frontpage;
use CloakWP\API\Menus;
use CloakWP\API\Posts;
use CloakWP\API\Widgets;
use CloakWP\Frontend\Auth;
use CloakWP\Frontend\ISR;
use CloakWP\Frontend\Preview;
use CloakWP_Public;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    CloakWP
 * @subpackage CloakWP/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      0.6.0
 * @package    CloakWP
 * @subpackage CloakWP/includes
 * @author     Cloak Labs 
 */
class CloakWP
{

  /**
   * The loader that's responsible for maintaining and registering all hooks that power
   * the plugin.
   *
   * @since    0.6.0
   * @access   protected
   * @var      CloakWP_Loader    $loader    Maintains and registers all hooks for the plugin.
   */
  protected $loader;

  /**
   * The unique identifier of this plugin.
   *
   * @since    0.6.0
   * @access   protected
   * @var      string    $plugin_name    The string used to uniquely identify this plugin.
   */
  protected $plugin_name;

  /**
   * The current version of the plugin.
   *
   * @since    0.6.0
   * @access   protected
   * @var      string    $version    The current version of the plugin.
   */
  protected $version;

  /**
   * Define the core functionality of the plugin.
   *
   * Set the plugin name and the plugin version that can be used throughout the plugin.
   * Load the dependencies, define the locale, and set the hooks for the admin area and
   * the public-facing side of the site.
   *
   * @since    0.6.0
   */
  public function __construct()
  {
    if (defined('CLOAKWP_VERSION')) {
      $this->version = CLOAKWP_VERSION;
    } else {
      $this->version = '0.6.0';
    }
    $this->plugin_name = 'cloakwp';

    $this->load_dependencies();
    $this->set_locale();
    $this->define_admin_hooks();
    $this->define_public_hooks();
  }

  /**
   * Load the required dependencies for this plugin.
   *
   * Include the following files that make up the plugin:
   *
   * - PluginLoader. Orchestrates the hooks of the plugin.
   * - i18n. Defines internationalization functionality.
   * - Admin. Defines all hooks for the admin area.
   * - CloakWP_Public. Defines all hooks for the public side of the site.
   *
   * Create an instance of the loader which will be used to register the hooks
   * with WordPress.
   *
   * @since    0.6.0
   * @access   private
   */
  private function load_dependencies()
  {

    /**
     * The class responsible for orchestrating the actions and filters of the
     * core plugin.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/General/PluginLoader.php';

    /**
     * The class responsible for defining internationalization functionality
     * of the plugin.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/General/i18n.php';
    
    
    /**
     * The class responsible for defining all actions that occur in the admin area.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-cloakwp-admin.php';
    
    /**
     * The class responsible for defining all actions that occur in the public-facing
     * side of the site.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-cloakwp-public.php';
    
    /**
     * The class responsible for defining all on-demand ISR functionality
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/Frontend/ISR.php';

    /**
     * The class responsible for defining all headless preview mode functionality
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/Frontend/Preview.php';

    /**
     * The class responsible for defining all headless login/logout functionality
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/Frontend/Auth.php';

    /**
     * The class responsible for defining all REST API modifications for posts
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/API/Posts.php';

    /**
     * The class responsible for defining all REST API modifications for widgets
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/API/Widgets.php';

    /**
     * The class responsible for defining all functionality related to converting Gutenberg Block data to JSON for the REST API
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/API/BlockTransformer.php';

    $this->loader = new PluginLoader();
  }

  /**
   * Define the locale for this plugin for internationalization.
   *
   * Uses the CloakWP_i18n class in order to set the domain and to register the hook
   * with WordPress.
   *
   * @since    0.6.0
   * @access   private
   */
  private function set_locale()
  {
    $plugin_i18n = new i18n();

    $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
  }

  /**
   * Register all of the hooks related to the admin area functionality
   * of the plugin.
   *
   * @since    0.6.0
   * @access   private
   */
  private function define_admin_hooks()
  {
    $plugin_admin = new Admin($this->get_plugin_name(), $this->get_version());

    new Auth();
    new Preview();
    new ISR();

    $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
    $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
  }

  /**
   * Register all of the hooks related to the public-facing functionality
   * of the plugin.
   *
   * @since    0.6.0
   * @access   private
   */
  private function define_public_hooks()
  {
    $plugin_public = new CloakWP_Public($this->get_plugin_name(), $this->get_version());
    
    new Widgets();
    new Posts();
    new Menus();
    new Frontpage();
    new BlockTransformer();

    $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
    $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since    0.6.0
   */
  public function run()
  {
    $this->loader->run();
  }

  /**
   * The name of the plugin used to uniquely identify it within the context of
   * WordPress and to define internationalization functionality.
   *
   * @since     0.6.0
   * @return    string    The name of the plugin.
   */
  public function get_plugin_name()
  {
    return $this->plugin_name;
  }

  /**
   * The reference to the class that orchestrates the hooks with the plugin.
   *
   * @since     0.6.0
   * @return    CloakWP_Loader    Orchestrates the hooks of the plugin.
   */
  public function get_loader()
  {
    return $this->loader;
  }

  /**
   * Retrieve the version number of the plugin.
   *
   * @since     0.6.0
   * @return    string    The version number of the plugin.
   */
  public function get_version()
  {
    return $this->version;
  }

  /**
   * @param bool CLOAKWP_ENABLE_DEV_MODE
   * @param string CLOAKWP_FRONTEND_URL
   * 
   * @return string
   * 
   * @since    0.6.0
   */
  public static function get_frontend_url()
  {
    if (defined('CLOAKWP_ENABLE_DEV_MODE')) {
      if (CLOAKWP_ENABLE_DEV_MODE === TRUE) {
        return "http://localhost:3000";
      }
    }

    if (defined('CLOAKWP_FRONTEND_URL')) {
      return CLOAKWP_FRONTEND_URL;
    }

    return site_url();
  }

  /**
   * 
   * @param string CLOAKWP_PREVIEW_SECRET
   * 
   * @return string
   * 
   * @since    0.6.0
   */
  public static function get_preview_secret()
  {
    if (defined('CLOAKWP_PREVIEW_SECRET')) {
      return CLOAKWP_PREVIEW_SECRET;
    }
    return "";
  }
}
