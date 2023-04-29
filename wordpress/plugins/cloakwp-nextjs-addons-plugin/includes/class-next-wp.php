<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    Next_Wp
 * @subpackage Next_Wp/includes
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
 * @package    Next_Wp
 * @subpackage Next_Wp/includes
 * @author     Cloak Labs 
 */
class Next_Wp
{

  /**
   * The loader that's responsible for maintaining and registering all hooks that power
   * the plugin.
   *
   * @since    0.6.0
   * @access   protected
   * @var      Next_Wp_Loader    $loader    Maintains and registers all hooks for the plugin.
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
    if (defined('NEXT_WP_VERSION')) {
      $this->version = NEXT_WP_VERSION;
    } else {
      $this->version = '0.6.0';
    }
    $this->plugin_name = 'next-wp';

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
   * - Next_Wp_Loader. Orchestrates the hooks of the plugin.
   * - Next_Wp_i18n. Defines internationalization functionality.
   * - Next_Wp_Admin. Defines all hooks for the admin area.
   * - Next_Wp_Public. Defines all hooks for the public side of the site.
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
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-next-wp-loader.php';

    /**
     * The class responsible for defining internationalization functionality
     * of the plugin.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-next-wp-i18n.php';
    
    /**
     * The class responsible for defining all ISR functionality
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-next-wp-isr.php';

    /**
     * The class responsible for defining all ISR functionality
     * 
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-next-wp-preview.php';
    
    /**
     * The class responsible for defining all actions that occur in the admin area.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-next-wp-admin.php';

    /**
     * The class responsible for defining all actions that occur in the public-facing
     * side of the site.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-next-wp-public.php';


    $this->loader = new Next_Wp_Loader();
  }

  /**
   * Define the locale for this plugin for internationalization.
   *
   * Uses the Next_Wp_i18n class in order to set the domain and to register the hook
   * with WordPress.
   *
   * @since    0.6.0
   * @access   private
   */
  private function set_locale()
  {

    $plugin_i18n = new Next_Wp_i18n();

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

    $plugin_admin = new Next_Wp_Admin($this->get_plugin_name(), $this->get_version());

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

    $plugin_public = new Next_Wp_Public($this->get_plugin_name(), $this->get_version());

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
   * @return    Next_Wp_Loader    Orchestrates the hooks of the plugin.
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
   * @param bool NEXT_WP_ENABLE_DEV_MODE
   * @param string NEXT_WP_NEXT_FRONTEND_URL
   * 
   * @return string
   * 
   * @since    0.6.0
   */
  public static function get_frontend_url()
  {
    if (defined('NEXT_WP_ENABLE_DEV_MODE')) {
      if (NEXT_WP_ENABLE_DEV_MODE === TRUE) {
        return "http://localhost:3000";
      }
    }

    if (defined('NEXT_WP_NEXT_FRONTEND_URL')) {
      return NEXT_WP_NEXT_FRONTEND_URL;
    }

    return site_url();
  }

  /**
   * 
   * @param string NEXT_WP_PREVIEW_SECRET
   * 
   * @return string
   * 
   * @since    0.6.0
   */
  public static function get_preview_secret()
  {
    if (defined('NEXT_WP_PREVIEW_SECRET')) {
      return NEXT_WP_PREVIEW_SECRET;
    }
    return "";
  }
}
