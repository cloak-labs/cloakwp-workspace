<?php

/**
 * Fired during plugin activation
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    Next_Wp
 * @subpackage Next_Wp/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run ISR.
 *
 * @since      0.6.0
 * @package    Next_Wp
 * @subpackage Next_Wp/includes
 * @author     Cloak Labs 
 */
class Next_Wp_Isr
{

  public function __construct()
  {
    $this->enable_isr();
  }

  /**
   * On-demand Incremental Static Regeneration (ISR) 
   * 
   * rebuild static pages/posts immediately upon saving your changes in WP
   * 
   * 
   * @param int $post_ID
   * @param object $post
   * @param bool NEXT_WP_REVALIDATE_API_ROUTE
   * 
   * @return void
   * 
   * @since    0.6.0
   */
  public static function revalidate_on_save($post_ID, $post)
  {
    $front_end_url = get_frontend_url();
    $revalidate_api_route = defined('NEXT_WP_REVALIDATE_API_ROUTE') ? NEXT_WP_REVALIDATE_API_ROUTE : 'revalidate';
    // manually add environment URLs to this array if you wish to enable on-demand ISR for that environment (useful for testing one-off Vercel deployments or when running a production build locally) 
    $environments_to_revalidate = [$front_end_url, "http://localhost:3000"];
    $slug = $post->post_name;
    $type = $post->post_type;
    $secret = get_preview_secret();
    foreach ($environments_to_revalidate as $url) {
      try {
        wp_remote_get("{$url}/api/{$revalidate_api_route}/{$slug}?post_type={$type}&secret={$secret}");
      } catch (Exception $e) {
        echo 'Error while regenerating static page for url "', $url, '" -- error message: ', $e->getMessage(), "\n";
      }
    }
  }


  /**
   * On-demand Incremental Static Regeneration (ISR) 
   * 
   * rebuild static pages/posts immediately upon saving your changes in WP
   * 
   * @return void
   * 
   * @since    0.6.0
   */
  public function enable_isr()
  {
    add_action('save_post_page', array($this, 'revalidate_on_save'), 10, 2);
  }
}
