<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    CloakWP
 * @subpackage CloakWP/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    CloakWP
 * @subpackage CloakWP/admin
 * @author     Cloak Labs 
 */
class CloakWP_Admin
{

  /**
   * The ID of this plugin.
   *
   * @since    0.6.0
   * @access   private
   * @var      string    $plugin_name    The ID of this plugin.
   */
  private $plugin_name;

  /**
   * The version of this plugin.
   *
   * @since    0.6.0
   * @access   private
   * @var      string    $version    The current version of this plugin.
   */
  private $version;

  /**
   * Initialize the class and set its properties.
   *
   * @since    0.6.0
   * @param      string    $plugin_name       The name of this plugin.
   * @param      string    $version    The version of this plugin.
   */
  public function __construct($plugin_name, $version)
  {
    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->add_frontend_links();
    $this->add_frontend_view_links();
    $this->settings_init();
    $this->add_menu_item();
  }


  /**
   * Override the href for the site name & view site links (to use our Next front-end URL)
   * in the WP admin toolbar, and open them in new tabs
   *
   * @param object $wp_admin_bar
   * 
   * @return void
   * 
   * @since    0.6.0
   */
  public static function customize_admin_bar($wp_admin_bar)
  {
    // Get references to the 'view-site' and 'site-name' nodes to modify.
    $view_site_node = $wp_admin_bar->get_node('view-site');
    $site_name_node = $wp_admin_bar->get_node('site-name');

    // Change targets
    $view_site_node->meta['target'] = '_blank';
    $site_name_node->meta['target'] = '_blank';

    // Change hrefs to our frontend URL
    $url = CloakWP::get_frontend_url();
    $view_site_node->href = $url;
    $site_name_node->href = $url;

    // Update Nodes
    $wp_admin_bar->add_node($view_site_node);
    $wp_admin_bar->add_node($site_name_node);
  }


  /**
   * Modify 'View Post' links on posts, pages to point to frontend URL
   * 
   * @return string
   *
   * @since    0.6.0
   */
  public static function custom_view_page_url($permalink, $post)
  {
    $custom_permalink = CloakWP::get_frontend_url();
    if ($permalink) {
      $custom_permalink = str_replace(home_url(), $custom_permalink,  $permalink);
    }
    return $custom_permalink;
  }

  /**
   * 
   * Options page function
   * 
   * @return void
   *
   * @since    0.6.0
   */
  public function cloakwp_options_page()
  { ?>
    <div>
      <h2>CloakWP Configuration</h2>
      <?php
      settings_fields('cloakwp_settings');
      do_settings_sections('cloakwp_settings');
      ?>
    </div>
  <?php
  }

  /**
   * Function to output HTML to display env var
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private static function echo_variable($var)
  {
    if (isset($var)) {
      if (gettype($var) === 'boolean') {
        if ($var === TRUE) {
          echo "<span>TRUE</span>";
        }
        if ($var === FALSE) {
          echo "<span>FALSE</span>";
        }
      }
      if (gettype($var) === 'string') {
        if (strlen($var) > 0) {
          echo "<span>'" . $var . "'</span>";
        }
        if (strlen($var) === 0) {
          echo "<span>''</span>";
        }
      }
      echo "<span> (" . gettype($var) . ")</span>";
    } else {
      echo "<span>Unset</span>";
    }
  }


  /**
   * Output a row on the settings page
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private static function settings_row($name)
  {
    if (defined($name)) {
      $var = constant($name);
    } else {
      $var = NULL;
    }
  ?>
    <tr>
      <th scope="row">
        <?php echo $name ?>
      </th>
      <td><?php self::echo_variable($var); ?></td>
    </tr>
  <?php
  }

  /**
   * Ouput the rows of settings vars to the admin page
   * 
   * @return void
   *
   * @since    0.6.0
   */
  public function cloakwp_config_section_callback()
  { ?>
    <table class="form-table" role="presentation">
      <tbody>
        <?php
        self::settings_row('CLOAKWP_FRONTEND_URL');
        self::settings_row('CLOAKWP_PREVIEW_SECRET');
        self::settings_row('CLOAKWP_ENABLE_DEV_MODE');
        self::settings_row('CLOAKWP_PREVIEW_API_ROUTE');
        self::settings_row('CLOAKWP_REVALIDATE_API_ROUTE');
        self::settings_row('CLOAKWP_LOGIN_API_ROUTE');
        self::settings_row('CLOAKWP_LOGOUT_API_ROUTE'); ?>
      </tbody>
    </table>
<?php
  }

  /**
   * Initialize the settings & settings page section
   * 
   * @return void
   *
   * @since    0.6.0
   */
  public function cloakwp_settings_init()
  {
    register_setting('cloakwp_settings', 'cloakwp_settings');

    add_settings_section(
      'config_section',
      __('Configuration Variables', 'cloakwp'),
      array($this, 'cloakwp_config_section_callback'),
      'cloakwp_settings'
    );
  }


  /**
   * Add CloakWP menu item to wordpress admin
   * 
   * @return void
   *
   * @since    0.6.0
   */
  public function add_admin_menu()
  {
    add_menu_page(
      'CloakWP',
      'CloakWP',
      'manage_options',
      'cloakwp',
      array($this, 'cloakwp_options_page'),
      'data:image/svg+xml;base64,' . base64_encode('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22.43.01-.73.07C14.88.69 8.5 4.37 4.45 10.02A23.75 23.75 0 0 0 .22 20.51a18.3 18.3 0 0 0-.22 3.5c0 1.78.02 2.17.22 3.49A24.1 24.1 0 0 0 21.7 47.94c.73.08 3.87.08 4.6 0a24.22 24.22 0 0 0 8.65-2.53c.4-.2.49-.27.43-.31-.03-.03-1.8-2.4-3.9-5.24l-3.84-5.19-4.81-7.11a688.2 688.2 0 0 0-4.84-7.12c-.02 0-.04 3.16-.05 7.02-.02 6.76-.02 7.04-.1 7.2a.85.85 0 0 1-.42.42c-.15.08-.28.1-.99.1h-.81l-.22-.15a.88.88 0 0 1-.31-.34l-.1-.2.01-9.42.02-9.4.14-.19c.08-.1.24-.22.35-.29.19-.09.27-.1 1.08-.1.95 0 1.11.04 1.36.31.07.08 2.68 4 5.8 8.72l9.46 14.34 3.8 5.76.2-.13c1.7-1.1 3.5-2.68 4.92-4.32a23.89 23.89 0 0 0 5.65-12.27c.2-1.32.22-1.7.22-3.5 0-1.78-.02-2.17-.22-3.49A24.1 24.1 0 0 0 26.37.07c-.45-.04-3.55-.1-3.94-.06zm9.82 14.52a.95.95 0 0 1 .48.55c.03.12.04 2.73.03 8.61v8.44l-1.5-2.28-1.49-2.28v-6.14c0-3.96.02-6.19.05-6.3a.96.96 0 0 1 .46-.59c.2-.1.26-.1 1-.1.7 0 .82 0 .97.09z" fill="#000"/></svg>')
    );
  }

  /**
   * Override the href for the site name & view site links
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private function settings_init()
  {
    add_action('admin_init', array($this, 'cloakwp_settings_init'));
  }

  /**
   * Override the href for the site name & view site links
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private function add_menu_item()
  {
    add_action('admin_menu', array($this, 'add_admin_menu'));
  }


  /**
   * Override the href for the site name & view site links
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private function add_frontend_links()
  {
    add_action('admin_bar_menu', array($this, 'customize_admin_bar'), 80);
  }

  /**
   * Modify 'View Post' links on posts, pages to point to frontend URL
   * 
   * @return void
   *
   * @since    0.6.0
   */
  private function add_frontend_view_links()
  {
    add_filter('page_link', array($this, 'custom_view_page_url'), 10, 2);
    add_filter('post_link', array($this, 'custom_view_page_url'), 10, 2);
    add_filter('post_type_link', array($this, 'custom_view_page_url'), 10, 2);
  }

  /**
   * Register the stylesheets for the admin area.
   *
   * @since    0.6.0
   */
  public function enqueue_styles()
  {

    /**
     * This function is provided for demonstration purposes only.
     *
     * An instance of this class should be passed to the run() function
     * defined in CloakWP_Loader as all of the hooks are defined
     * in that particular class.
     *
     * The CloakWP_Loader will then create the relationship
     * between the defined hooks and the functions defined in this
     * class.
     */

    wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/cloakwp-admin.css', array(), $this->version, 'all');
  }

  /**
   * Register the JavaScript for the admin area.
   *
   * @since    0.6.0
   */
  public function enqueue_scripts()
  {

    /**
     * This function is provided for demonstration purposes only.
     *
     * An instance of this class should be passed to the run() function
     * defined in CloakWP_Loader as all of the hooks are defined
     * in that particular class.
     *
     * The CloakWP_Loader will then create the relationship
     * between the defined hooks and the functions defined in this
     * class.
     */

    wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/cloakwp-admin.js', array('jquery'), $this->version, false);
  }
}
