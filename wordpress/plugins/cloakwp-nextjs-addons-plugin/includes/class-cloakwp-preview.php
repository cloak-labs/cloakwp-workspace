<?php

/**
 * Fired during plugin activation
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    CloakWP
 * @subpackage CloakWP/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run NextJS preview mode.
 *
 * @since      0.6.0
 * @package    CloakWP
 * @subpackage CloakWP/includes
 * @author     Cloak Labs 
 */
class CloakWP_preview
{

  public function __construct()
  {
    $this->add_frontend_login();
    $this->add_frontend_logout();
    $this->add_frontend_preview_link();
    $this->add_frontend_preview_redirect();
  }

  /** 
   * Whenever you log in to WordPress, we redirect to an API endpoint on our Next front-end (/api/login) 
   * which sets a cookie that tells cloakwp you're logged in, and it redirects you back to the Admin dashboard.
   * CloakWP will read this cookie to determine when to show the AdminBar component. We use a redirect rather than
   * a GET request so that it also works while in local development (can't GET request localhost from WP) 
   *
   * @param string CLOAKWP_LOGIN_API_ROUTE
   * 
   * @return void 
   */
  public function login_on_frontend()
  {
    $url = CloakWP::get_frontend_url();
    $secret = CloakWP::get_preview_secret();
    $login_api_route = defined('CLOAKWP_LOGIN_API_ROUTE') ? CLOAKWP_LOGIN_API_ROUTE : 'login';

    try {
      $res = wp_redirect("{$url}/api/{$login_api_route}?secret={$secret}");
      exit();
    } catch (Exception $e) {
      echo "Error while logging in on front-end ({$url}). Error message: ", $e->getMessage(), "\n";
    }
  }


  /** 
   * Whenever you log out of WordPress, we redirect to an API endpoint on our Next front-end (/api/logout) 
   * which sets a cookie that tells cloakwp you're logged out, and it redirects you back to the WP login screen.
   * CloakWP will read this cookie to determine when to show the AdminBar component. We use a redirect rather than
   * a GET request so that it also works while in local development (can't GET request localhost from WP) 
   *
   * @param string CLOAKWP_LOGOUT_API_ROUTE
   * 
   * @return void
   */
  public function logout_on_frontend()
  {
    $url = CloakWP::get_frontend_url();
    $secret = CloakWP::get_preview_secret();
    $logout_api_route = defined('CLOAKWP_LOGOUT_API_ROUTE') ? CLOAKWP_LOGOUT_API_ROUTE : 'logout';

    try {
      $res = wp_redirect("{$url}/api/{$logout_api_route}?secret={$secret}");
      exit();
    } catch (Exception $e) {
      write_log("Error while logging out on front-end ({$url}). Error message: ", $e->getMessage(), "\n");
    }
  }

  /** 
   * Modify 'Preview' links on posts, pages to point to frontend URL
   * Request to NextJS API Route generates the frontend page using preview data and redirects to it
   * Requires a 'preview secret' as a query param to match on Wordpress and NextJS server
   * 
   * @param bool CLOAKWP_PREVIEW_API_ROUTE
   * @param string $preview_link
   * @param object $post
   * 
   * @return string
   * 
   * @since    0.6.0
   */
  public function get_preview_url($preview_link, $post)
  {
    $preview_api_route = defined('CLOAKWP_PREVIEW_API_ROUTE') ? CLOAKWP_PREVIEW_API_ROUTE : 'preview';
    $revisionId = $post->ID; // the ID of the post revision, not the master post
    $postId = $post->post_parent; // the revision's parent == the post we're previewing
    $postType = get_post_type($postId); // the master/parent post's post type --> important for cloakwp to retrieve the correct revision data  
    $secret = CloakWP::get_preview_secret();
    $front_end_url = CloakWP::get_frontend_url();
    return "{$front_end_url}/api/{$preview_api_route}?revisionId={$revisionId}&postId={$postId}&postType={$postType}&secret={$secret}";
  }

  /** 
   * Redirect WP preview page to Next preview --> this is in addition to our 'preview_post_link' filter above that changes the preview link (which doesn't work all the time due to known bugs).
   * If somehow our 'preview_post_link' filter doesn't work and the admin user ends up on the default WP preview URL, this redirects them to our Next preview API route
   * 
   * @param string CLOAKWP_PREVIEW_API_ROUTE
   * 
   * @return void
   * 
   * @since    0.6.0
   */
  public static function preview_post_redirect()
  {
    if (isset($_GET["preview"]) && $_GET["preview"] == true) {
      $front_end_url = CloakWP::get_frontend_url();
      $preview_api_route = defined('CLOAKWP_PREVIEW_API_ROUTE') ? CLOAKWP_PREVIEW_API_ROUTE : 'preview';
      $secret = CloakWP::get_preview_secret();
      $postId = $_GET["p"];
      $postType = get_post_type($postId); // the master/parent post's post type --> important for cloakwp to retrieve the correct revision data  
      wp_redirect("{$front_end_url}/api/{$preview_api_route}?postId={$postId}&postType={$postType}&secret={$secret}");
      exit();
    }
  }

  /**
   * @return void
   * 
   * @since    0.6.0
   */
  private function add_frontend_login()
  {
    add_action('wp_login', array($this, 'logout_on_frontend'));
  }

  /**
   * @return void
   * 
   * @since    0.6.0
   */
  private function add_frontend_logout()
  {
    add_action('wp_logout', array($this, 'logout_on_frontend'));
  }

  /**
   * @return void
   * 
   * @since    0.6.0
   */
  private function add_frontend_preview_link()
  {
    add_filter('preview_post_link', array($this, 'get_preview_url'), 10);
  }

  /**
   * @return void
   * 
   * @since    0.6.0
   */
  private function add_frontend_preview_redirect()
  {
    add_action('template_redirect', array($this, 'preview_post_redirect'));
  }
}
