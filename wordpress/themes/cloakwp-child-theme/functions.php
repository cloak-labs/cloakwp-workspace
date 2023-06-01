<?php

add_action('enqueue_block_editor_assets', 'gutenberg_editor_assets');
function gutenberg_editor_assets()
{
  // Load our custom styles for the Gutenberg editor:
  wp_enqueue_style('my-gutenberg-editor-styles', get_theme_file_uri('/blocks/styles.css'), array(), filemtime('/blocks/styles.css'), 'all');
  
  // Load our custom JS scripts that modify/strip the Gutenberg editor in opinionated ways:
  wp_enqueue_script('gutenberg-editor-js', get_theme_file_uri('/blocks/scripts.js'), array(), filemtime('/blocks/scripts.js'), true);
}

add_theme_support('post-thumbnails'); // enable featured images
add_post_type_support('page', 'excerpt'); // enable page excerpts

/*
  Register whatever menus your project needs here. This is required in order for WP Admin > Appearance > Menus page to be visible for new Block themes such as this one. 
*/
add_action('init', 'register_menus');
function register_menus()
{
  register_nav_menus(
    array(
      'nav-1' => __('Nav Dropdown #1'),
      'nav-2' => __('Nav Dropdown #2'),
      'nav-3' => __('Nav Dropdown #3'),
      'nav-4' => __('Nav Dropdown #4'),
      'footer-menu' => __('Footer')
    )
  );
}

// TODO: consider better solution for exposing menu in REST API and put in parent theme?
// Adds a custom REST API endpoint "/menu" which returns WP menu data
add_action('rest_api_init', function () {
  register_rest_route('wp/v2', 'menu', array(
    'methods' => 'GET',
    'callback' => 'custom_wp_menu',
  ));
});

// create custom function to return nav menu
function custom_wp_menu() {
   // Replace your menu name, slug or ID carefully
   return wp_get_nav_menu_items('Navbar');
}


/*
  Register your custom Gutenberg/ACF blocks here
*/
add_action('init', 'register_blocks');
function register_blocks()
{
  register_block_type(get_template_directory() . '/blocks/postList/block.json');
  register_block_type(get_template_directory() . '/blocks/pageHeader/block.json');
  register_block_type(get_template_directory() . '/blocks/testimonial/block.json');
  register_block_type(get_template_directory() . '/blocks/cardFeature/block.json');
  register_block_type(get_template_directory() . '/blocks/faq/block.json');
  register_block_type(get_template_directory() . '/blocks/cta/block.json');
}




/*
  Adjust this function based on your project's CPTs and your front-end's routes.
  
  This function allows us to prepend a custom subdirectory to a CPT's post slugs.
  eg. an FAQ post's slug will become '/faqs/xyz-post-slug', rather than just 'xyz-post-slug'
  You need to make the post slugs match whatever routing structure you created on the Next
  front-end, so that when a content editor adds an internal link to an FAQ from within a blog 
  post, for example, the link is correct and matches the front-end URL structure.
  
  Note: this only works for CPTs; to customize the default "posts" URL subdirectory (eg. prepend
  'blog/' to post slugs), use the WP Admin > Settings > Permalinks > Custom Structure setting,
  with a value such as "/blog/%postname%/"
*/
add_filter('register_post_type_args', 'wpd_change_post_type_args', 10, 2);
function wpd_change_post_type_args($args, $post_type)
{
  if ('testimonials' == $post_type) {
    $args['rewrite']['with_front'] = false;
    $args['rewrite']['slug'] = 'testimonials';
  } else if ('faqs' == $post_type) {
    $args['rewrite']['with_front'] = false;
    $args['rewrite']['slug'] = 'faqs';
  }
  return $args;
}


/*
  Remove "Comments" from wp-admin sidebar for all roles.
  Remove "Tools", "Dashboard", and "Yoast SEO" for non-admins
*/
function remove_admin_pages(){
  remove_menu_page('edit-comments.php');

  if (!current_user_can( 'administrator' )) { // remove certain pages for editors only
    remove_menu_page('tools.php'); // remove "Tools"
    remove_menu_page('index.php'); // remove "Dashboard"

    // remove Yoast SEO
    remove_menu_page('wpseo_dashboard');
    remove_menu_page('wpseo_workouts');
  }
}
add_action( 'admin_menu', 'remove_admin_pages' );

/*
  Function to remove various options in wp-admin top toolbar (not sidebar)
  Currently used to remove the "Comments" and "View Posts" menu items
*/
function remove_admin_toolbar_options() {
  global $wp_admin_bar;
  $wp_admin_bar->remove_menu('comments');
  $wp_admin_bar->remove_menu('archive');
}
add_action( 'wp_before_admin_bar_render', 'remove_admin_toolbar_options' );